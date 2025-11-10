const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String },
    description: { type: String, required: true },

    // 🧩 Enum-based Skills Field (clean + validated)
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
  "c++"
],
   set: (skills) => [...new Set(skills.map((s) => s.trim().toLowerCase()))]

    },

    // 🧍‍♂️ Link job to the employer who created it
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
module.exports=Job;