import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/authSlice";

import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import Logout from './Pages/Auth/Logout';
import LandingPage from './Pages/LandingPage/LandingPage';

import ProtectedRoute from './routes/ProtectedRoute';

import EmployerDashboard from './Pages/Employer/EmployerDashboard';
import JobPostingForm from './Pages/Employer/JobPostingForm';
import ManageJobs from './Pages/Employer/ManageJobs';
import DeleteJob from './Pages/Employer/DeleteJob';
import EditJob from './Pages/Employer/EditJob';
import FindJobs from './Pages/JobSeeker/Components/Findjobs';
import Applicants from './Pages/Employer/Applicants';

// ✅ NEW IMPORTS
import EmployerProfile from './Pages/Employer/Employerprofile';
import JobseekerProfile from './Pages/JobSeeker/Components/JobSeekerprofile';
import JobSeekerDashboard from './Pages/JobSeeker/Components/JobseekerDashboard';
import AppliedJobs from './Pages/JobSeeker/Components/AppliedJobs';
import JobSeekerLayout from './Pages/JobSeeker/Components/JobSeekerLayout';
import EmployerLayout from './Pages/Employer/EmployerLayout';

const App = () => {
   const dispatch = useDispatch();

  // ⭐ Auto-login on refresh
 useEffect(() => {
  // Only call /auth/me if cookie exists
  if (document.cookie.includes("token")) {
    dispatch(checkAuth());
  }
}, [dispatch]);

  return (
    <Router>
      <Routes>

        {/* 🌍 Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout />} />

      {/* 🔒 Protected Job Seeker Routes */}
     <Route element={<ProtectedRoute requiredRole="jobseeker" />}>
      <Route element={<JobSeekerLayout />}>

    {/* Dashboard */}
    <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />

    {/* Find Jobs */}
    <Route path="/find-jobs" element={<FindJobs />} />

    {/* Applied Jobs */}
    <Route path="/jobseeker/applied" element={<AppliedJobs />} />

    {/* Jobseeker Profile */}
    <Route path="/jobseeker/profile" element={<JobseekerProfile />} />

  </Route>
</Route>

        {/* 🔒 Protected Employer Routes */}
        <Route element={<ProtectedRoute requiredRole="employer" />}>
          <Route element={<EmployerLayout />}>

          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/post-job" element={<JobPostingForm />} />
          <Route path="/manage-jobs" element={<ManageJobs />} />
          <Route path="/delete-job/:id" element={<DeleteJob />} />
          <Route path="/edit-job/:id" element={<EditJob />} />
          <Route path="/applied-jobs" element={<Applicants />} />

          {/* 🆕 Employer Profile */}
          <Route path="/employer/profile" element={<EmployerProfile />} />
          </Route>

        </Route>

        {/* ❌ Wrong route → redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
};

export default App;
