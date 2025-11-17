import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

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

const App = () => {
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
          <Route path="/find-jobs" element={<FindJobs />} />

          {/* 🆕 Jobseeker Profile */}
          <Route path="/jobseeker/profile" element={<JobseekerProfile />} />
        </Route>

        {/* 🔒 Protected Employer Routes */}
        <Route element={<ProtectedRoute requiredRole="employer" />}>
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/post-job" element={<JobPostingForm />} />
          <Route path="/manage-jobs" element={<ManageJobs />} />
          <Route path="/delete-job/:id" element={<DeleteJob />} />
          <Route path="/edit-job/:id" element={<EditJob />} />
          <Route path="/applied-jobs" element={<Applicants />} />

          {/* 🆕 Employer Profile */}
          <Route path="/employer/profile" element={<EmployerProfile />} />
        </Route>

        {/* ❌ Wrong route → redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
};

export default App;
