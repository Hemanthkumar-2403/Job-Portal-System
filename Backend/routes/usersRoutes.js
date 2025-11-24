const express = require("express");
const updateEmployerInfo = require("../controller/usersController/employerInfo");
const updateJobseekerInfo = require("../controller/usersController/jobseekerInfo");
const { verifyToken } = require("../middleware/authMiddleware");
const { uploadProfilePic, uploadResume, uploadCompanyLogo } = require("../middleware/uploadMiddleware");
const { updateProfilePic } = require("../controller/uploadController");

const router = express.Router();

// ✅ Upload Image (profile picture)
router.post("/upload-profile-pic", verifyToken, uploadProfilePic.single("image"), updateProfilePic);
//company logo
router.post("/upload-company-logo", verifyToken, uploadCompanyLogo.single("image"), updateProfilePic);

// ✅ Upload Resume (pdf/doc/docx)
router.post("/upload-resume", verifyToken, uploadResume.single("resume"), updateProfilePic);

// 🏢 Employer Info Update
router.patch("/update-employer-info", verifyToken, updateEmployerInfo);

// 🎓 Jobseeker Info Update
router.patch("/update-jobseeker-info", verifyToken, updateJobseekerInfo);

module.exports = router;
