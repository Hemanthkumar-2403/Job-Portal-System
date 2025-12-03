
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const JobSeekerDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  // SAFE name + initial
  const userName = user?.name || user?.fullName || "User";
  const initial = userName.charAt(0).toUpperCase();

  // PROFILE PIC LOGIC (same as navbar)
  const profilePic =
    user?.profilePic ||               // main profile
    user?.jobseeker?.profilePic ||    // fallback
    "";

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-6">

        {/* Avatar */}
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border shadow"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-semibold text-gray-700 border shadow">
            {initial}
          </div>
        )}

        {/* User Info */}
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {userName} 👋
          </h1>

          <p className="text-gray-600 mt-1">
            📞 <strong>{user?.jobseeker?.phone || "No phone added"}</strong>
          </p>

          <p className="text-gray-600 mt-1">
            📄 Resume:{" "}
            {user?.jobseeker?.resume ? (
              <a
                href={user.jobseeker.resume}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Download Resume
              </a>
            ) : (
              "Not uploaded"
            )}
          </p>
        </div>
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
