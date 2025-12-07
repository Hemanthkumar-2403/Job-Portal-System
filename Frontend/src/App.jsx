import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { checkAuth } from "./redux/authSlice";

import ForgotPassword from './Pages/Auth/ForgotPassword';
import Logout from './Pages/Auth/Logout';
import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import LandingPage from './Pages/LandingPage/LandingPage';

import ProtectedRoute from './routes/ProtectedRoute';

import Applicants from './Pages/Employer/Applicants';
import DeleteJob from './Pages/Employer/DeleteJob';
import EditJob from './Pages/Employer/EditJob';
import EmployerDashboard from './Pages/Employer/EmployerDashboard';
import JobPostingForm from './Pages/Employer/JobPostingForm';
import ManageJobs from './Pages/Employer/ManageJobs';

// 🔍 Correct case-sensitive import
import Findjobs from './Pages/JobSeeker/Components/Findjobs';

// NEW IMPORTS FIXED
import EmployerLayout from './Pages/Employer/EmployerLayout';
import EmployerProfile from "./Pages/Employer/EmployerProfile";

import AppliedJobs from './Pages/JobSeeker/Components/AppliedJobs';
import JobseekerDashboard from './Pages/JobSeeker/Components/JobseekerDashboard';
import JobseekerLayout from './Pages/JobSeeker/Components/JobseekerLayout';
import JobseekerProfile from './Pages/JobSeeker/Components/JobseekerProfile';

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
          <Route element={<JobseekerLayout />}>

            {/* Dashboard */}
            <Route path="/jobseeker/dashboard" element={<JobseekerDashboard />} />

            {/* Find Jobs */}
            <Route path="/find-jobs" element={<Findjobs />} />

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
