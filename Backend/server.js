const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");
const AuthRoutes =require("./routes/authRoutes")
const UserRoute =require("./routes/usersRoutes")
const cookieParser= require("cookie-parser");
const JobRoutes =require("./routes/jobRoutes");
const seekerRoutes=require("./routes/seekerRoutes");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());




//Auth Routes
app.use("/api/auth" ,AuthRoutes)
//User Routes
app.use("/api/users" ,UserRoute)
//jobs Routes
app.use("/api/jobs" ,JobRoutes)

//jobseeker Routes
app.use("/api/jobseeker" ,seekerRoutes)


// ✅ This line ensures uploaded files are accessible by URL
app.use("/uploads", express.static("uploads"));


const PORT = process.env.PORT || 5100;
// ✅ Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});  