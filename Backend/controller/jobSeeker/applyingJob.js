const Application = require("../../models/Application");
const Job = require("../../models/Job");

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

    const newApplication = new Application({
      job: jobId,
      jobSeeker: jobSeekerId,
    });

    await newApplication.save();

    const populated = await Application.findById(newApplication._id)
      .populate({
        path: "job",
        select: "title company location createdBy",
      })
      .populate("jobSeeker", "name email");

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: {
        id: populated._id,
        jobTitle: populated.job.title,
        company: populated.job.company,
        location: populated.job.location,
        jobSeekerName: populated.jobSeeker.name,
        appliedAt: populated.createdAt,
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
