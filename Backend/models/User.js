
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["jobseeker", "employer"], required: true },

    // ⭐ NEW FIELD
    profileCompleted: { type: Boolean, default: false },

    // Common
    profilePic: { type: String, default: "" },

    employer: {
      companyName: { type: String, default: "" },
      companyDescription: { type: String, default: "" },
      companyLogo: { type: String, default: "" },
    },

    jobseeker: {
      education: { type: String, default: "" },
      graduationYear: { type: String, default: "" },
      experience: { type: String, default: "" },
      skills: { type: [String], default: [] },
      resume: { type: String, default: "" },
        phone: { type: String, default: "" }  // ⭐ ADD THIS

    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
