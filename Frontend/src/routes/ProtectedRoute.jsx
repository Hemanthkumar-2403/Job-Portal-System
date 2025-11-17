
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ requiredRole }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // 🚫 Case 1: User NOT logged in
  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  // 🚫 Case 2: Role mismatch
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // ⭐ Case 3: EMPLOYER → Check Profile Completion
  if (user.role === "employer") {
    const employerIncomplete =
      !user.employer?.companyName ||
      !user.employer?.companyDescription ||
      !user.employer?.companyLogo; // add pic if needed

    // prevent infinite loop by checking current path
    if (employerIncomplete && location.pathname !== "/employer/profile") {
      return <Navigate to="/employer/profile" replace />;
    }
  }

  // ⭐ Case 4: JOBSEEKER → Check Profile Completion
  if (user.role === "jobseeker") {
    const jobSeekerIncomplete =
      !user.jobseeker?.education ||
      !user.jobseeker?.skills?.length;

    if (jobSeekerIncomplete && location.pathname !== "/jobseeker/profile") {
      return <Navigate to="/jobseeker/profile" replace />;
    }
  }

  // 🎉 Case 5: Everything OK → Allow access
  return <Outlet />;
};

export default ProtectedRoute;
