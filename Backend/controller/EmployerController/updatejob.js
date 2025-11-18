const Job = require("../../models/Job");

const editJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const employerId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.createdBy.toString() !== employerId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updates = { ...req.body };
// Requirements
if (updates.requirements) {
  updates.requirements = Array.isArray(updates.requirements)
    ? updates.requirements
    : updates.requirements
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
}

// Responsibilities
if (updates.responsibilities) {
  updates.responsibilities = Array.isArray(updates.responsibilities)
    ? updates.responsibilities
    : updates.responsibilities
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
}

// Skills
if (updates.skills) {
  updates.skills = Array.isArray(updates.skills)
    ? updates.skills
    : updates.skills
        .split(",")
        .map((s) => s.trim().toLowerCase());
}


    const updatedJob = await Job.findByIdAndUpdate(jobId, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("❌ Error editing job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = editJob;
