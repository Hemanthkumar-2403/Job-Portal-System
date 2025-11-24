// uploadController.js
const path = require("path");
const User = require("../models/User");

const updateProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const folderName = req.file.destination.split(path.sep).pop();

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${folderName}/${req.file.filename}`;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // ============================
    // 🔥 ROLE-BASED FILE SAVING 🔥
    // ============================

    if (req.user.role === "jobseeker") {
      if (!user.jobseeker) user.jobseeker = {};

      if (folderName === "profilePics") {
        user.jobseeker.profilePic = fileUrl;
      }

      if (folderName === "resumes") {
        user.jobseeker.resume = fileUrl;
      }
    }

    if (req.user.role === "employer") {
      if (!user.employer) user.employer = {};

      if (folderName === "profilePics") {
        user.employer.profilePic = fileUrl;
      }

      if (folderName === "companyLogos") {
        user.employer.companyLogo = fileUrl;
      }
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      fileUrl,
    });

  } catch (err) {
    console.error("Upload Error:", err);
    return res.status(500).json({ success: false, message: "Server error while uploading" });
  }
};

module.exports = { updateProfilePic };
