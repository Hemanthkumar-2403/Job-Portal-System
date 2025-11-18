// uploadController.js
const path = require("path");
const User = require("../models/User");

const updateProfilePic = async (req, res) => {
  try {
    // debug log
    console.log(">>> uploadController called - file:", !!req.file, "body:", req.body);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // req.file.destination is an absolute path (because we used path.join)
    // get the folder name relative to uploads
    const dest = req.file.destination || ""; // e.g. /.../project/uploads/profilePics
    const folderName = dest.split(path.sep).pop(); // profilePics

    // create public URL that matches your server static mount
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${folderName}/${req.file.filename}`;

    // find user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Save profile pic to root and/or employer (depends on your design).
    // We'll update both to be safe: root profilePic (used in many places) and employer.companyLogo if requested.
    // But this upload route is generic: it only gets one file and no knowledge whether it's companyLogo or profilePic.
    // We'll set root profilePic; the employerInfo patch will set companyLogo when you call it.
    user.profilePic = imageUrl;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      profilePic: imageUrl,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    return res.status(500).json({ success: false, message: "Server error while uploading" });
  }
};

module.exports = { updateProfilePic };
