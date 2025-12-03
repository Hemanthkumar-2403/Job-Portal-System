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
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }

    // 3️⃣ Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // 4️⃣ Create JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    sameSite: "lax",   
  path: "/",
    });

    // 6️⃣ Fetch FULL user details (important)
    const freshUser = await User.findById(user._id).lean();

    // 7️⃣ SEND FULL USER DATA INCLUDING profileCompleted
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        _id: freshUser._id,
        name: freshUser.name,
        email: freshUser.email,
        role: freshUser.role,
        profilePic: freshUser.profilePic || null,

        // ⭐ SUPER IMPORTANT: Now signin returns this
        profileCompleted: freshUser.profileCompleted,

        // ⭐ Employer data returned so redux has full info
        employer: freshUser.employer,
        jobseeker: freshUser.jobseeker,
      },
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
      secure: false,     // localhost --> false
      sameSite: "lax",   // MUST be 'lax' for non-HTTPS
      path: "/",         // VERY IMPORTANT
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", err });
  }
};



// =========================
// ⭐ Get Logged-in User (Auto Login)
// =========================
const getCurrentUser = async (req, res) => {
  try {
    // req.user.id comes from authMiddleware (decoded from JWT cookie)
    const user = await User.findById(req.user.id).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // return full clean user object
    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,

        // important flags
        profileCompleted: user.profileCompleted,

        // employer/user objects
        employer: user.employer,
        jobseeker: user.jobseeker,
      }
    });

  } catch (error) {
    console.error("🔥 GetCurrentUser Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

module.exports = {
  signupUser,
  signinUser,
  forgotPassword,
  Logout,
  getCurrentUser, // ⭐ add here
};


module.exports = {signupUser , signinUser,forgotPassword ,Logout ,getCurrentUser}; 