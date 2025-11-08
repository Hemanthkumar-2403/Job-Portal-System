const Job = require("../../models/Job");

// PUT /api/jobs/:id
const editJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const employerId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.createdBy.toString() !== employerId) {
      return res.status(403).json({ message: "Unauthorized to edit this job" });
    }

    const updates = req.body;
    const updatedJob = await Job.findByIdAndUpdate(jobId, updates, { new: true });

    res.status(200).json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    console.error("Error editing job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = editJob;
