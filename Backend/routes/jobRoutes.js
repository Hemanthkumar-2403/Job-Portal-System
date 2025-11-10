const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const postJob = require("../controller/EmployerController/createjob");
const getJobs = require("../controller/EmployerController/getjob");
const deleteJob = require("../controller/EmployerController/deletejob");
const editJob = require("../controller/EmployerController/updatejob");
const router = express.Router();

router.post("/" ,verifyToken,postJob)
router.get("/",getJobs)
router.delete("/:id" , verifyToken,deleteJob)
router.patch("/:id",verifyToken,editJob)


module.exports=router