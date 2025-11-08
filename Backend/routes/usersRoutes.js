
const express = require("express");
const updateEmployerInfo = require("../controller/usersController/employerInfo");
const updateJobseekerInfo = require("../controller/usersController/jobseekerInfo");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// 🏢 Employer Info Update (PATCH is better)
router.patch("/update-employer-info", verifyToken, updateEmployerInfo);

// 🎓 Jobseeker Info Update (PATCH too)
router.patch("/update-jobseeker-info",verifyToken , updateJobseekerInfo);

module.exports = router;