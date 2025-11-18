// controllers/JobSeeker/applyJob.js
const Application = require("../../models/Application");
const Job = require("../../models/Job");

const applyingJob = async (req, res) => {
  try {
    const jobId = req.params.id; // from URL params
    const jobSeekerId = req.user.id; // from JWT (auth middleware)

    // 1️⃣ Role-based check — only jobseekers can apply
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ 
        success: false,
        message: "Only job seekers can apply for jobs" 
      });
    }

    // 2️⃣ Validate job existence
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ 
        success: false,
        message: "Job not found" 
      });
    }

    // 3️⃣ Prevent duplicate applications
    const alreadyApplied = await Application.findOne({ job: jobId, jobSeeker: jobSeekerId });
    if (alreadyApplied) {
      return res.status(400).json({ 
        success: false,
        message: "You already applied for this job" 
      });
    }

    // 4️⃣ Create new application (resume optional for now)
    const newApplication = new Application({
      job: jobId,
      jobSeeker: jobSeekerId,
      // resume: req.file ? req.file.path : null // (if multer is used)
    });

    await newApplication.save();

    // 5️⃣ Populate job and jobSeeker details (for frontend)
    const populated = await Application.findById(newApplication._id)
      .populate({
        path: "job",
        select: "title company location createdBy"
      })
      .populate("jobSeeker", "name email");
      
    // 6️⃣ Send clean structured response
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: {
        id: populated._id, // Application ID
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
      message: "Server error, please try again later" 
    });
  }
};

module.exports={applyingJob}
