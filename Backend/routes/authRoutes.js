
const express= require("express")
const {signupUser, signinUser, forgotPassword, Logout, getCurrentUser}=require("../controller/authController");
const { verifyToken } = require("../middleware/authMiddleware");

const router =express.Router()

//auth

router.post("/signup" , signupUser)
router.post("/signin" , signinUser)
router.patch("/forgot-password" , forgotPassword)
router.post("/logout" ,Logout)


// ⭐ NEW AUTO LOGIN ROUTE
router.get("/me", verifyToken, getCurrentUser);
module.exports=router;