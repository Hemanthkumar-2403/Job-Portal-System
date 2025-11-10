const Application = require("../../models/Application");

const deleteApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const jobSeekerId = req.user.id; // from JWT (auth middleware)

    // 1️⃣ Check if the application exists
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // 2️⃣ Check if this application belongs to the logged-in job seeker
    if (application.jobSeeker.toString() !== jobSeekerId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to withdraw this application",
      });
    }

    // 3️⃣ Delete the application
    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: "Application withdrawn successfully",
    });

  } catch (error) {
    console.error("Error withdrawing application:", error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

module.exports = deleteApplication;
