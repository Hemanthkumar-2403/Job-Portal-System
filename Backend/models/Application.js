
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    jobSeeker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ⭐ ADD THIS – store job seeker phone
    phone: {
      type: String,
      default: "",
    },

    // ⭐ Resume already exists — good
    resume: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Applied", "Under Review", "Shortlisted", "Rejected"],
      default: "Applied",
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
