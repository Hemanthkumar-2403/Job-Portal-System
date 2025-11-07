
const express= require("express")
const {signupUser, signinUser, forgotPassword, Logout}=require("../controller/authController");
const { upload } = require("../middleware/uploadMiddleware");
const { uploadProfileImage } = require("../controller/uploadController");

const router =express.Router()

// ✅ Upload Image Route
router.post("/upload-image", upload.single("image"), uploadProfileImage);


router.post("/signup" , signupUser)
router.post("/signin" , signinUser)
router.post("/forgot-password" , forgotPassword)
router.post("/logout" ,Logout)
module.exports=router;