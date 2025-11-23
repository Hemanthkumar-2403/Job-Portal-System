import React from "react";
import JobSeekerSidebar from "./JobseekerSidebar";
import { Outlet } from "react-router-dom";

export default function JobSeekerLayout() {
  return (
    <div className="flex">
      <JobSeekerSidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
