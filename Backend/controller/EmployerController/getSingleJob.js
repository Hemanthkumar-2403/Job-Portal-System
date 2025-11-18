const Job = require("../../models/Job");

const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ job });
  } catch (error) {
    console.error("❌ Error fetching single job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getSingleJob;
