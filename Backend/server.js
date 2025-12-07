const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");
const AuthRoutes = require("./routes/authRoutes");
const UserRoute = require("./routes/usersRoutes");
const cookieParser = require("cookie-parser");
const JobRoutes = require("./routes/jobRoutes");
const seekerRoutes = require("./routes/seekerRoutes");
const EmployerViewRoutes = require("./routes/employerViewRoutes");
const publicJobRoutes = require("./routes/publicJobRoutes");

dotenv.config();
const app = express();
app.use(express.json());

// ✅ FIXED CORS for cookies
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Cookie parser (after CORS)
app.use(cookieParser());

//Auth Routes
app.use("/api/auth", AuthRoutes);

//User Routes
app.use("/api/users", UserRoute);

//jobs Routes
app.use("/api/jobs", JobRoutes);

//jobseeker Routes
app.use("/api/jobseeker", seekerRoutes);

//employer
app.use("/api/employer", EmployerViewRoutes);

//jobseeker publicroutes
app.use("/api/public-jobs", publicJobRoutes);

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
