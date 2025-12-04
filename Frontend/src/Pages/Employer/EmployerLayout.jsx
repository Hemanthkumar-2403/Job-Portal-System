import React from "react";
import EmployerSidebar from "../Employer/EmployerSidebar";
import { Outlet } from "react-router-dom";

export default function EmployerLayout() {
  return (
    <div className="flex">
      
      {/* Left Sidebar */}
      <EmployerSidebar />

      {/* Right Content Area */}
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Outlet />
      </div>

    </div>
  );
}
