import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // ✅ Simulated auth user data
  const isAuthenticated = true;
  const user = { fullName: "Nani", role: "employer" };

  // ✅ React Router hook for navigation
  const navigate = useNavigate();

  // 🔹 Simple function to go to homepage
  const handleLogoClick = () => {
    navigate("/"); // goes to landing page
  };

  // 🔹 Function for "Find Jobs"
  const handleFindJobs = () => {
    navigate("/find-jobs");
  };

  // 🔹 Function for "For Employers"
  const handleForEmployers = () => {
    if (isAuthenticated && user?.role === "employer") {
      navigate("/employer-dashboard");
    } else {
      navigate("/login");
    }
  };

  // 🔹 Function for Dashboard button
  const handleDashboardClick = () => {
    if (user?.role === "employer") {
      navigate("/employer-dashboard");
    } else {
      navigate("/find-jobs");
    }
  };

  // 🔹 Function for Login and Signup
  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">

        {/* 🧱 LOGO SECTION */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center rounded-md">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">JobPortal</span>
        </div>

        {/* 🧭 NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={handleFindJobs}
            className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            Find Jobs
          </button>

          <button
            onClick={handleForEmployers}
            className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            For Employers
          </button>
        </nav>

        {/* 👤 AUTH SECTION */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <span className="text-gray-700">
                Welcome, <span className="font-medium">{user?.fullName}</span>
              </span>
              <button
                onClick={handleDashboardClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
              >
                Dashboard
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="text-gray-600 hover:text-gray-900 transition font-medium"
              >
                Login
              </button>
              <button
                onClick={handleSignup}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
