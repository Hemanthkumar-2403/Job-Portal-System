const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const updateApplicationStatus = require("../controller/EmployerViewController/updateApplicationstatus");
const viewApplicationsByEmployer =require("../controller/EmployerViewController/viewApplication")
const router = express.Router();

// ✅ View all applications
router.get("/applications", verifyToken, viewApplicationsByEmployer);

// ✅ Update application status
router.patch("/application/:id/status", verifyToken, updateApplicationStatus);

module.exports = router;
