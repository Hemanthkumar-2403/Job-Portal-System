import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ requiredRole }) => {
  // ✅ Get current user info from Redux store
  const { user } = useSelector((state) => state.auth);
  const location = useLocation(); // remember last page if redirect happens

  // 🚫 Case 1: User not logged in → redirect to signin
  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  // 🚫 Case 2: If route requires a specific role (like employer or jobseeker)
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // ✅ Case 3: User logged in + correct role → allow access
  return <Outlet />;
};

export default ProtectedRoute;
