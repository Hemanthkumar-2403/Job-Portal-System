
const Application = require("../../models/Application");
const Job = require("../../models/Job");

const applyingJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobSeekerId = req.user.id;

    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only jobseekers can apply" });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const alreadyApplied = await Application.findOne({ job: jobId, jobSeeker: jobSeekerId });
    if (alreadyApplied)
      return res.status(400).json({ message: "Already applied to this job" });

    // Create application
    const newApplication = new Application({
      job: jobId,
      jobSeeker: jobSeekerId,
    });

    await newApplication.save();

    // ⭐ UPDATE JOB WITH APPLICANT
    await Job.findByIdAndUpdate(jobId, {
      $push: {
        applicants: { userId: jobSeekerId, appliedAt: Date.now() }
      }
    });

    res.status(201).json({
      success: true,
      message: "Application submitted",
    });
  } catch (err) {
    console.error("Apply error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { applyingJob };
