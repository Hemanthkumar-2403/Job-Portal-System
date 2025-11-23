import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const JobSeekerDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user?.profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border shadow"
        />

        <h1 className="text-3xl font-bold">
          Welcome, {user?.name || "Job Seeker"} 👋
        </h1>
      </div>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Find Jobs */}
        <Link
          to="/find-jobs"
          className="bg-white shadow-md p-5 rounded-xl hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">🔍 Find Jobs</h2>
          <p className="text-gray-600 text-sm">
            Browse job listings and apply instantly.
          </p>
        </Link>

        {/* Applied Jobs */}
        <Link
          to="/jobseeker/applied"
          className="bg-white shadow-md p-5 rounded-xl hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">📄 My Applications</h2>
          <p className="text-gray-600 text-sm">
            Track jobs you already applied for.
          </p>
        </Link>

        {/* Update Profile */}
        <Link
          to="/jobseeker/profile"
          className="bg-white shadow-md p-5 rounded-xl hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">👤 Update Profile</h2>
          <p className="text-gray-600 text-sm">
            Edit your skills, experience and resume.
          </p>
        </Link>

      </div>
    </div>
  );
};

export default JobSeekerDashboard;
