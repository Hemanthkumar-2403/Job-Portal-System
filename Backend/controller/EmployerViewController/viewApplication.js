const Application = require("../../models/Application");
const Job = require("../../models/Job");

const viewApplicationsByEmployer = async (req, res) => {
  try {
    const employerId = req.user.id; // Logged-in employer ID

    // 1️⃣ Verify the user is an employer
    if (req.user.role !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Access denied! Only employers can view applications.",
      });
    }

    // 2️⃣ Find all jobs created by this employer
    const employerJobs = await Job.find({ createdBy: employerId }).select("_id title");
    if (!employerJobs.length) {
      return res.status(404).json({
        success: false,
        message: "No jobs found for this employer.",
      });
    }

    // Extract job IDs
    const jobIds = employerJobs.map((job) => job._id);

    // 3️⃣ Find all applications for these jobs
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate({
        path: "job",
        select: "title company location salary",
      })
      .populate({
        path: "jobSeeker",
        select: "name email",
      })
      .sort({ createdAt: -1 }); // latest first

    if (!applications.length) {
      return res.status(404).json({
        success: false,
        message: "No applications found for your jobs.",
      });
    }

    // 4️⃣ Format the response neatly
    const formatted = applications.map((app) => ({
      applicationId: app._id,
      jobTitle: app.job?.title,
      company: app.job?.company,
      location: app.job?.location,
      jobSeekerName: app.jobSeeker?.name,
      jobSeekerEmail: app.jobSeeker?.email,
        phone: app.phone,                    
      resume: app.resume,
      status: app.status,
      appliedAt: app.createdAt,
    }));

    // 5️⃣ Send response
    res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      total: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error("Error fetching employer applications:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching applications.",
    });
  }
};

module.exports = viewApplicationsByEmployer;
