import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ requiredRole }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // ⏳ WAIT: checkAuth is still loading
  if (loading) {
    return <div>Loading...</div>;  // temporary loader
  }

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
    if (!user.profileCompleted && location.pathname !== "/employer/profile") {
      return <Navigate to="/employer/profile" replace />;
    }

    const employerIncomplete =
      !user.employer?.companyName ||
      !user.employer?.companyDescription ||
      !user.employer?.companyLogo;

    if (employerIncomplete && location.pathname !== "/employer/profile") {
      return <Navigate to="/employer/profile" replace />;
    }
  }

  // ⭐ Case 4: JOBSEEKER → Check Profile Completion
  if (user.role === "jobseeker") {
    if (!user.profileCompleted && location.pathname !== "/jobseeker/profile") {
      return <Navigate to="/jobseeker/profile" replace />;
    }

    const jobSeekerIncomplete =
      !user.jobseeker?.education ||
      !user.jobseeker?.skills?.length ||
      !user.jobseeker?.resume;

    if (jobSeekerIncomplete && location.pathname !== "/jobseeker/profile") {
      return <Navigate to="/jobseeker/profile" replace />;
    }
  }

  // 🎉 Case 5: Everything OK → Allow access
  return <Outlet />;
};

export default ProtectedRoute;
