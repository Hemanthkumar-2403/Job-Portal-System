import { Outlet } from "react-router-dom";
import JobSeekerSidebar from "./JobSeekerSidebar";

 function JobseekerLayout() {
  return (
    <div className="flex">
      <JobSeekerSidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default JobseekerLayout
