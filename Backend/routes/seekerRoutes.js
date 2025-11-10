
const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { applyingJob } = require("../controller/jobSeeker/applyingJob");
const viewAppliedJobs =require("../controller/jobSeeker/viewApplied");
const deleteApplication =require("../controller/jobSeeker/deleteApplication");
const { uploadResume } = require("../middleware/uploadMiddleware");
const updateApplication = require("../controller/jobSeeker/updateResApplication");

const router = express.Router();

//apply for job
router.post("/apply/:id" ,verifyToken ,applyingJob);

//view for all applied jobs
router.get("/applied" ,verifyToken,viewAppliedJobs)

//withdraw or delete application
router.delete("/delete/:id" ,verifyToken,deleteApplication)

//upload/update Resume Apllication
router.patch("/update/:id", verifyToken, uploadResume.single("resume"), updateApplication);

module.exports=router