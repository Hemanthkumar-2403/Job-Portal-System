// controller/usersController/jobseekerInfo.js
const User = require("../../models/User");

const updateJobseekerInfo = async (req, res) => {
  try {
    // Only jobseekers allowed
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
      resume,       // resume URL
      profilePic,   // profile pic URL
      phone         // ⭐ ADD THIS
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ===========================
    // ⭐ UPDATE FIELDS
    // ===========================
    user.jobseeker.education = education;
    user.jobseeker.graduationYear = graduationYear;
    user.jobseeker.experience = experience;

    // Skills → array
    user.jobseeker.skills = Array.isArray(skills)
      ? skills
      : skills.split(",").map((s) => s.trim());

    // Resume
    if (resume) {
      user.jobseeker.resume = resume;
    }

    // Profile Pic
    if (profilePic) {
      user.profilePic = profilePic;
    }

    // ⭐ PHONE NUMBER UPDATE (MAIN FIX)
    if (phone) {
      user.jobseeker.phone = phone;
    }

    // Mark profile completed
    user.profileCompleted = true;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Jobseeker profile updated successfully",
      user,
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
