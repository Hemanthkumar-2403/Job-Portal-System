const Application = require("../../models/Application");
const Job = require("../../models/Job");

const updateApplicationStatus = async (req, res) => {
  try {
    const employerId = req.user.id; // From token
    const applicationId = req.params.id;
    const { status } = req.body;

    // 1️⃣ Role check
    if (req.user.role !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Access denied! Only employers can update application status.",
      });
    }

    // 2️⃣ Validate status input
    const validStatuses = ["Applied", "Under Review", "Shortlisted", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed values: Applied, Under Review, Shortlisted, Rejected",
      });
    }

    // 3️⃣ Find application
    const application = await Application.findById(applicationId)
      .populate("job", "createdBy title")
      .populate("jobSeeker", "name email");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // 4️⃣ Ensure the employer owns this job
    if (application.job.createdBy.toString() !== employerId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this application's status",
      });
    }

    // 5️⃣ Update status
    application.status = status;
    await application.save();

    // 6️⃣ Send clean response
    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: {
        applicationId: application._id,
        jobTitle: application.job.title,
        jobSeeker: application.jobSeeker.name,
        email: application.jobSeeker.email,
        updatedStatus: application.status,
        updatedAt: application.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating status.",
    });
  }
};

module.exports = updateApplicationStatus;
