const User = require("../models/User");

// ✅ Update User Profile Picture
const updateProfilePic = async (req, res) => {
  try {
    // 1️⃣ Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "❌ No image uploaded. Please select a file.",
      });
    }

    // 2️⃣ Create full URL for uploaded image
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // 3️⃣ Find user by ID (decoded from token in middleware)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "❌ User not found.",
      });
    }

    // 4️⃣ Update user's profilePic in DB
    user.profilePic = imageUrl;
    await user.save();

    // 5️⃣ Send success response
    return res.status(200).json({
      success: true,
      message: "✅ Profile picture updated successfully!",
      profilePic: imageUrl,
    });

  } catch (error) {
    console.error("❌ Update Profile Picture Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "⚙️ Server error while updating profile picture.",
    });
  }
};

module.exports = { updateProfilePic };
