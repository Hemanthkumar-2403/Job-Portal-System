// controller/jobSeekerController/viewAppliedJobs.js
const Application = require("../../models/Application");

const viewAppliedJobs = async (req, res) => {
  try {
    const jobSeekerId = req.user.id; // from auth middleware

    // 1️⃣ Fetch all applications by this user
    const applications = await Application.find({ jobSeeker: jobSeekerId })
      .populate({
        path: "job",
        select: "title company location salary createdBy",
      })
      .sort({ createdAt: -1 }); // newest first

    // 2️⃣ If no applications found
    if (!applications.length) {
      return res.status(404).json({
        success: false,
        message: "No applied jobs found",
      });
    }

    // 3️⃣ Format response (clean output)
    const formatted = applications.map((app) => ({
      id: app._id,
        jobId: app.job?._id,   // add this
      jobTitle: app.job?.title,
      company: app.job?.company,
      location: app.job?.location,
      salary: app.job?.salary || "Not specified",
      status: app.status,
      appliedAt: app.createdAt,
    }));
    
// 4️⃣ Send response
res.status(200).json({
  success: true,
  message: "Applied jobs fetched successfully",
  applications: formatted,   // 🔥 FIXED NAME
});

  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

module.exports = viewAppliedJobs;
