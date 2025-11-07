// controllers/UploadController.js
const path = require("path");

// ✅ Upload Profile Image Controller
const uploadProfileImage = (req, res) => {
  try {
    // 1️⃣ Check if file received
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "❌ No file uploaded. Please choose an image.",
      });
    }

    // 2️⃣ Create full image URL
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // 3️⃣ Send response
    return res.status(200).json({
      success: true,
      message: "✅ File uploaded successfully!",
      imageUrl,
    });
  } catch (error) {
    console.error("❌ Upload Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error during upload",
    });
  }
};

module.exports = { uploadProfileImage };
