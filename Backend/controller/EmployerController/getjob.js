const Job = require("../../models/Job");

const getJobs = async (req, res) => {
  try {
    const employerId = req.user.id;

    const jobs = await Job.find({ createdBy: employerId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Jobs fetched successfully",
      jobs
    });
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getJobs;
