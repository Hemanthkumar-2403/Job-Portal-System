const Application = require("../../models/Application");

const updateApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;      // application id from URL
    const jobSeekerId = req.user.id;          // user id from JWT token

    // 1️⃣ Check if the application exists
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // 2️⃣ Verify the ownership (user can update only their own application)
    if (application.jobSeeker.toString() !== jobSeekerId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this application",
      });
    }

    // 3️⃣ Make sure file uploaded (multer handles validation)
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume file",
      });
    }

    // 4️⃣ Update resume path in DB
    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { resume: req.file.path },
      { new: true }
    ).populate({
      path: "job",
      select: "title company location",
    });

    // 5️⃣ Send clean response
    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      data: {
        applicationId: updatedApplication._id,
        jobTitle: updatedApplication.job.title,
        company: updatedApplication.job.company,
        location: updatedApplication.job.location,
        resumePath: updatedApplication.resume,
      },
    });

  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({
      success: false,
      message: "Server error while uploading resume",
    });
  }
};

module.exports = updateApplication;
