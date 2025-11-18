import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);

  // Extract user name + initials
  const userName = user?.name || "User";
  const initial = userName.charAt(0).toUpperCase();
  const profilePic = user?.profilePic;

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 rounded hover:bg-gray-100" aria-label="menu">
            ☰
          </button>

          <Link to="/" className="text-xl font-semibold text-pink-600">
            JobPortal
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* Post Job Button */}
          <Link
            to="/post-job"
            className="hidden md:inline-block bg-pink-600 text-white px-3 py-1.5 rounded"
          >
            Post Job
          </Link>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-700">
              Hi, <span className="font-medium">{userName}</span>
            </div>

            {/* Profile Pic or Initial */}
            {profilePic ? (
              <img
                src={profilePic}
                alt="profile"
                className="w-9 h-9 rounded-full object-cover border"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                {initial}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
