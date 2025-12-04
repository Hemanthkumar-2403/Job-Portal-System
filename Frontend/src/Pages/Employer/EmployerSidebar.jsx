
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice";

const Item = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-3 py-2 rounded-lg text-sm ${
        isActive ? "bg-pink-100 text-pink-700" : "text-gray-700 hover:bg-gray-50"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Listen for toggle-sidebar event
  useEffect(() => {
    const toggle = () => setOpen((prev) => !prev);
    window.addEventListener("toggle-sidebar", toggle);

    return () => window.removeEventListener("toggle-sidebar", toggle);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/signin");
  };

  return (
    <>
      {/* MOBILE SIDEBAR */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 h-full w-64 bg-white border-r z-50
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Employer</h3>

          <nav className="flex flex-col gap-1">
            <Item to="/employer-dashboard">Dashboard</Item>
            <Item to="/post-job">Post Job</Item>
            <Item to="/manage-jobs">Manage Jobs</Item>
            <Item to="/applied-jobs">Applicants</Item>
            <Item to="/employer/profile">Company Profile</Item>

            <button
              onClick={handleLogout}
              className="mt-3 block w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
}
