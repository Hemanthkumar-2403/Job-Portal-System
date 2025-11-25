import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice"; // ⭐ import logout

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // User details
  const userName = user?.name || "User";
  const initial = userName.charAt(0).toUpperCase();
  const profilePic = user?.profilePic;

  // Logout handler
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/signin"); // redirect to signin
  };

  return (
    <header className="w-full bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 rounded hover:bg-gray-100" aria-label="menu">
            ☰
          </button>

          <Link to="/" className="text-xl font-semibold text-pink-600">
            JobPortal
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* Post Job Btn */}
          <Link
            to="/post-job"
            className="hidden md:inline-block bg-pink-600 text-white px-3 py-1.5 rounded"
          >
            Post Job
          </Link>

          {/* USER DROPDOWN */}
          <div className="relative">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
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

            {/* DROPDOWN MENU */}
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  My Profile
                </Link>

                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
