// ✅ Import required modules
const bcrypt=require("bcryptjs")
const User=require("../models/User")
const jwt = require("jsonwebtoken");


// ✅ Signup Controller
const signupUser = async (req, res) => {

  try {
    // 1️⃣ Destructure data from request body
    const { name, email, password, role, profilePic } = req.body;
    

    // 2️⃣ Validate input fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
      // 400 = Bad Request (client sent invalid data)
    }

    // 3️⃣ Check if user already exists
    const existingUser = await User.findOne({ email});
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email.",
      });
      // 409 = Conflict (duplicate resource)
    }

    // 4️⃣ Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create new user document
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profilePic: profilePic || "",
    });

    console.log("✅ User created:", newUser.email);

    // 6️⃣ Send success response
    return res.status(201).json({
      success: true,
      message: "Signup successful!",
    });
    // 201 = Created (new resource created successfully)

  } catch (error) {
    console.error("❌ Signup Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
    // 500 = Server error (something went wrong on backend)
  }
};






//  SIGNIN CONTROLLER

const signinUser = async (req, res) => {
  console.log("✅ signinUser function triggered");

  try {
    // 1️⃣ Get email and password from request body
    const { email, password } = req.body;

    // 2️⃣ Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // 3️⃣ Check if user exists in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }

    // 4️⃣ Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // 5️⃣ Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },   // Payload (encoded info)
      process.env.JWT_SECRET,              // Secret key from .env
      { expiresIn: "7d" }                  // Token validity (7 days)
    );

    // 6️⃣ Store token in secure HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,   // Prevents access by JavaScript
      secure: false,     // Ensures cookie sent only via HTTPS
      
    });

    // 7️⃣ Send simple success response (no sensitive user info)
    return res.status(200).json({
      success: true,  // no HTTPS in localhost
      message: "Login successful!",
    });

  } catch (error) {
    console.error("❌ Signin Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};



//ForgotPassword

const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};



// ✅ Logout Controller
const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // use true when deployed (HTTPS)
      sameSite: "None"
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

module.exports = {signupUser , signinUser,forgotPassword ,Logout}; 