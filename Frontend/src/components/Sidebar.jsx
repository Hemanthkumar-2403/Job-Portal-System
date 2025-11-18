import React from "react";
import { NavLink } from "react-router-dom";

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
  return (
    <aside className="w-64 bg-white border-r hidden lg:block">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Employer</h3>
        <nav className="flex flex-col gap-1">
          <Item to="/employer-dashboard">Dashboard</Item>
          <Item to="/post-job">Post Job</Item>
          <Item to="/manage-jobs">Manage Jobs</Item>
          <Item to="/company-profile">Company Profile</Item>

        </nav>
      </div>
    </aside>
  );
}
