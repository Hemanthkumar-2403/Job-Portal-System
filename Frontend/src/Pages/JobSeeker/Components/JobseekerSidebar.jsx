
import React from "react";
import { NavLink } from "react-router-dom";

export default function JobSeekerSidebar() {
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

      </nav>
    </div>
  );
}
