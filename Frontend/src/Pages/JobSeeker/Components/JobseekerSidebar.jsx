import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/authSlice"; // ⭐ import logout

export default function JobSeekerSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // LOGOUT HANDLER
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/signin");
  };

  return (
    <div className="w-64 min-h-screen bg-white border-r shadow-sm p-5">
      <h2 className="text-2xl font-semibold mb-8 text-pink-600">Job Seeker</h2>

      <nav className="space-y-4">

        <NavLink
          to="/jobseeker/dashboard"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive ? "bg-pink-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/find-jobs"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive ? "bg-pink-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          🔍 Find Jobs
        </NavLink>

        <NavLink
          to="/jobseeker/applied"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive ? "bg-pink-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          📄 Applied Jobs
        </NavLink>

        <NavLink
          to="/jobseeker/profile"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive ? "bg-pink-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          👤 Profile
        </NavLink>

        {/* 🔥 LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
        >
          🚪 Logout
        </button>

      </nav>
    </div>
  );
}
