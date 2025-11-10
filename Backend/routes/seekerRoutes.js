
const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { applyingJob } = require("../controller/jobSeeker/applyingJob");
const viewAppliedJobs =require("../controller/jobSeeker/viewApplied");
const deleteApplication =require("../controller/jobSeeker/deleteApplication")
const router = express.Router();


router.post("/apply/:id" ,verifyToken ,applyingJob);
router.get("/applied" ,verifyToken,viewAppliedJobs)
router.delete("/delete/:id" ,verifyToken,deleteApplication)
module.exports=router