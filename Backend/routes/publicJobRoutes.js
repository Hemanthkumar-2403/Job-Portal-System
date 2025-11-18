const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

// PUBLIC: Get all jobs (no login required)
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    console.error("❌ Error fetching public jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
