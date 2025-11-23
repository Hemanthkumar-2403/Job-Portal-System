// uploadController.js
const path = require("path");
const User = require("../models/User");

const updateProfilePic = async (req, res) => {
  try {
    console.log(">>> uploadController called - file:", !!req.file, "body:", req.body);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const dest = req.file.destination || "";
    const folderName = dest.split(path.sep).pop();

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${folderName}/${req.file.filename}`;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // ⭐ DETECT FILE TYPE
   if (folderName === "profilePics") {
  console.log(">>> Saving profile pic");

  if (!user.jobseeker) user.jobseeker = {};  // ensure jobseeker exists

  user.jobseeker.profilePic = fileUrl;       //  SAVE CORRECTLY
}

if (folderName === "resumes") {
  console.log(">>> Saving resume file");

  if (!user.jobseeker) user.jobseeker = {};

  user.jobseeker.resume = fileUrl;           //  SAVE CORRECTLY
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
