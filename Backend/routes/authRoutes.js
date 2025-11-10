
const express= require("express")
const {signupUser, signinUser, forgotPassword, Logout}=require("../controller/authController");
const { uploadProfilePic } = require("../middleware/uploadMiddleware");
const { verifyToken } = require("../middleware/authMiddleware");
const{updateProfilePic}=require("../controller/uploadController")
const router =express.Router()

// ✅ Upload Image Route
router.post("/upload-image", verifyToken,uploadProfilePic.single("image"), updateProfilePic);


router.post("/signup" , signupUser)
router.post("/signin" , signinUser)
router.post("/forgot-password" , forgotPassword)
router.post("/logout" ,Logout)
module.exports=router;