const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const postJob = require("../controller/JobController/createjob");
const getJobs = require("../controller/JobController/getjob");
const deleteJob = require("../controller/JobController/deletejob");
const editJob = require("../controller/JobController/updatejob");
const router = express.Router();

router.post("/" ,verifyToken,postJob)
router.get("/",getJobs)
router.delete("/:id" , verifyToken,deleteJob)
router.patch("/:id",verifyToken,editJob)

module.exports=router