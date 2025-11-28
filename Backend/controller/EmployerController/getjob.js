const Job = require("../../models/Job");
const Application = require("../../models/Application");

const getJobs = async (req, res) => {
  try {
    const employerId = req.user.id;

    // 1️⃣ Get all employer jobs
    const jobs = await Job.find({ createdBy: employerId }).sort({ createdAt: -1 });

    // 2️⃣ Attach application count for each job
    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const count = await Application.countDocuments({ job: job._id });

        return {
          ...job.toObject(),
          applicantsCount: count, // ⭐ frontend can use this
        };
      })
    );

    res.status(200).json({
      success: true,
      jobs: jobsWithCounts,
    });

  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getJobs;
