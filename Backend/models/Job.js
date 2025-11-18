const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    company: { type: String, required: true },

    location: { type: String, required: true },

    salary: { type: String, default: "Not Mentioned" },

    employmentType: {
      type: String,
      required: true,
      enum: ["full-time", "part-time", "internship"],
    },

    description: { type: String, required: true },

    requirements: { type: [String], required: true },

    responsibilities: { type: [String], required: true },

    // 🧠 Skills → validated, cleaned, unique
    skills: {
      type: [String],
      required: true,
      enum: [
        "html",
        "css",
        "javascript",
        "react",
        "node.js",
        "express",
        "mongodb",
        "python",
        "java",
        "c++",
      ],
      set: (skills) =>
        [...new Set(skills.map((s) => s.trim().toLowerCase()))], // remove duplicates + normalize
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
