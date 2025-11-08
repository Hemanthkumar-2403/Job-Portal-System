const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // 🧍 Basic User Details
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // 🎭 Role (Jobseeker or Employer)
    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      required: true,
    },

    // 🖼️ Profile Picture
    profilePic: {
      type: String,
      default: "",
    },

    // 🏢 Company Details (for Employers)
    companyName: {
      type: String,
      default: "",
    },
    companyDescription: {
      type: String,
      default: "",
    },
    companyLogo: {
      type: String,
      default: "",
    },

    // 🎓 Job Seeker Details
    education: {
      type: String,
      default: "",
    },
    graduationYear: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports=User;
