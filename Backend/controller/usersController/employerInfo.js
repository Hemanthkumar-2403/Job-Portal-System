const User = require("../../models/User")

// Update Employer Info

const updateEmployerInfo = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Access denied: Not an employer" });
    }

    const { companyName, companyDescription, companyLogo } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        companyName,
        companyDescription,
        companyLogo,
      },
      { new: true }
    );

    res.json({ message: "Employer info updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports=updateEmployerInfo;