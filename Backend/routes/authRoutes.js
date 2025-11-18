
const express= require("express")
const {signupUser, signinUser, forgotPassword, Logout}=require("../controller/authController");

const router =express.Router()

//auth

router.post("/signup" , signupUser)
router.post("/signin" , signinUser)
router.patch("/forgot-password" , forgotPassword)
router.post("/logout" ,Logout)
module.exports=router;