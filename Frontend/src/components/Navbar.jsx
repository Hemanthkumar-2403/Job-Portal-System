import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice"; // your logout thunk

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ddRef = useRef(null);

  // SAFELY get user display name + initial
  const userName = user?.name || user?.fullName || "User";
  const initial = (userName && userName.charAt(0).toUpperCase()) || "U";

  // AVATAR fallback: top-level profilePic OR employer.jobseeker locations
const profilePic =
  user?.profilePic ||               // ⭐ MAIN (for both employer & jobseeker)
  user?.employer?.profilePic ||     // employer fallback
  user?.jobseeker?.profilePic ||    // jobseeker (if stored separately)
  "";


  // Logout handler
  const handleLogout = async () => {
    await dispatch(logoutUser());
    setOpen(false);
    navigate("/signin");
  };

  // Profile navigation (close dropdown)
  const handleProfile = () => {
    setOpen(false);
    if (user?.role === "employer") {
      navigate("/employer/profile");
    } else {
      navigate("/jobseeker/profile");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (ddRef.current && !ddRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
         <button
  className="md:hidden p-2 rounded hover:bg-gray-100"
  aria-label="menu"
  onClick={() => window.dispatchEvent(new CustomEvent("toggle-sidebar"))}
>
  ☰
</button>


          <Link to="/" className="text-xl font-semibold text-pink-600">
            JobPortal
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* Post Job Btn (visible on md+) */}
          <Link
            to="/post-job"
            className="hidden md:inline-block bg-pink-600 text-white px-3 py-1.5 rounded"
          >
            Post Job
          </Link>

          {/* USER DROPDOWN */}
          <div className="relative" ref={ddRef}>
            <div
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={() => setOpen((s) => !s)}
              role="button"
              aria-haspopup="true"
              aria-expanded={open}
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
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg border z-50">
                <button
                  onClick={handleProfile}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </button>

                <Link
                  to="/"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  onClick={() => setOpen(false)}
                >
                  Home
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
