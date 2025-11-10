const Job = require("../../models/Job");

// GET /api/jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name email");
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getJobs;
