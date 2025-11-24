const User = require("../../models/User");

const updateEmployerInfo = async (req, res) => {
  try {
    console.log(">>> updateEmployerInfo called, body:", req.body);

    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { companyName, companyDescription, companyLogo, profilePic } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update employer fields
    user.employer.companyName = companyName;
    user.employer.companyDescription = companyDescription;
    user.employer.companyLogo = companyLogo;

    // Update profile pic
    if (profilePic) user.employer.profilePic = profilePic;

    // Mark profile completed
    user.profileCompleted = true;

    await user.save();

    // ⭐ RE-FETCH UPDATED USER (VERY IMPORTANT)
    const updatedUser = await User.findById(req.user.id);

    res.json({
      success: true,
      message: "Employer info updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    console.error("Employer update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = updateEmployerInfo;
