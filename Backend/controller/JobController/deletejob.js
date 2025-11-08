const Job = require("../../models/Job");

// DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const employerId = req.user.id; // from middleware

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.createdBy.toString() !== employerId) {
      return res.status(403).json({ message: "Unauthorized to delete this job" });
    }

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = deleteJob;
