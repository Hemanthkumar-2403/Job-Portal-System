const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const postJob = require("../controller/EmployerController/createjob");
const getJobs = require("../controller/EmployerController/getjob");
const deleteJob = require("../controller/EmployerController/deletejob");
const editJob = require("../controller/EmployerController/updatejob");
const getSingleJob = require("../controller/EmployerController/getSingleJob");

const router = express.Router();

// Create Job
router.post("/create", verifyToken, postJob);

// Get employer jobs
router.get("/", verifyToken, getJobs);

// Get single job by ID
router.get("/:id", verifyToken, getSingleJob);


// Delete Job
router.delete("/:id", verifyToken, deleteJob);

// Update Job
router.patch("/:id", verifyToken, editJob);

module.exports = router;
