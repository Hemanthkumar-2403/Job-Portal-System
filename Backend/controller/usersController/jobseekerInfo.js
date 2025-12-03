// controller/usersController/jobseekerInfo.js
const User = require("../../models/User");

const updateJobseekerInfo = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Not a jobseeker",
      });
    }

    const {
      education,
      graduationYear,
      experience,
      skills,
      resume,
      profilePic,
      phone
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.jobseeker.education = education;
    user.jobseeker.graduationYear = graduationYear;
    user.jobseeker.experience = experience;
    user.jobseeker.skills = Array.isArray(skills)
      ? skills
      : skills.split(",").map((s) => s.trim());

    if (resume) user.jobseeker.resume = resume;
    if (profilePic) user.profilePic = profilePic;
    if (phone) user.jobseeker.phone = phone;

    user.profileCompleted = true;

    await user.save();

    // ⭐ IMPORTANT FIX
    const updatedUser = await User.findById(user._id);

    return res.status(200).json({
      success: true,
      message: "Jobseeker profile updated successfully",
      user: updatedUser,  // Must be inside user:
    });

  } catch (err) {
    console.error("Jobseeker update error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while updating jobseeker info",
    });
  }
};

module.exports = updateJobseekerInfo;
