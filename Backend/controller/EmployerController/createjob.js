const Job = require("../../models/Job");

// POST /api/jobs/create
const postJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      employmentType,
      description,
      requirements,
      responsibilities,
      skills,
    } = req.body;

    const employerId = req.user.id; // from verifyToken middleware

    // ❌ Validation
    if (
      !title ||
      !company ||
      !location ||
      !description ||
      !employmentType ||
      !requirements ||
      !responsibilities ||
      !skills
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔥 Convert skills → array
    const formattedSkills = Array.isArray(skills)
      ? skills
      : skills.split(",").map((s) => s.trim());

    // 🔥 Convert textarea → array of lines
    const formattedRequirements = requirements
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const formattedResponsibilities = responsibilities
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    // 🔥 Create Job
    const newJob = new Job({
      title,
      company,
      location,
      salary,
      employmentType,
      description,
      skills: formattedSkills,
      requirements: formattedRequirements,
      responsibilities: formattedResponsibilities,
      createdBy: employerId,
    });

    await newJob.save();

    res.status(201).json({
      message: "Job posted successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("❌ Error creating job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = postJob;
