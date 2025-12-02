const Application = require("../../models/Application");
const Job = require("../../models/Job");
const User = require("../../models/User");

const applyingJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobSeekerId = req.user.id;

    if (req.user.role !== "jobseeker") {
      return res.status(403).json({
        success: false,
        message: "Only job seekers can apply for jobs",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      jobSeeker: jobSeekerId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You already applied for this job",
      });
    }

    // ⭐ Fetch job seeker data
    const jobSeeker = await User.findById(jobSeekerId).select(
      "name email jobseeker.resume jobseeker.phone"
    );

    // ⭐ Create application including resume + phone
    const newApplication = new Application({
      job: jobId,
      jobSeeker: jobSeekerId,
      resume: jobSeeker.jobseeker.resume || "",
      phone: jobSeeker.jobseeker.phone || "",
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: {
        id: newApplication._id,
        jobTitle: job.title,
        company: job.company,
        jobSeekerName: jobSeeker.name,
        resume: newApplication.resume,
        phone: newApplication.phone,
        appliedAt: newApplication.createdAt,
      },
    });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

module.exports = { applyingJob };
