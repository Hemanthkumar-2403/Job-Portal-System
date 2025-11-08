
const User = require("../../models/User")

const updateJobseekerInfo = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Access denied: Not a job seeker" });
    }

    const { education, graduationYear, experience, skills } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        education,
        graduationYear,
        experience,
        skills: Array.isArray(skills) ? skills : skills.split(","),
      },
      { new: true }
    );

    res.json({ message: "Job seeker info updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports=updateJobseekerInfo;
