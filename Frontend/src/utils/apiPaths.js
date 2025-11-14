// ✅ apiPaths.js — All backend API routes (Frontend ↔ Backend connection)
// Each endpoint here matches your backend Express routes exactly.
// This file makes your API calls cleaner and easier to manage everywhere.

export const API_PATHS = {
  
  
  // 🔐 AUTHENTICATION ROUTES (Signup / Login / Logout)

  // User Signup → POST /api/auth/signup
  REGISTER: "/auth/signup",

  // User Login → POST /api/auth/signin
  LOGIN: "/auth/signin",

  // Forgot Password → POST /api/auth/forgot-password
  FORGOT_PASSWORD: "/auth/forgot_password",

  // Logout → POST /api/auth/logout
  LOGOUT: "/auth/logout",




  // 👤 USER ROUTES (Profile updates for Employer / Job Seeker)
  
  // Update Employer Info → PATCH /api/users/update-employer-info
  UPDATE_EMPLOYER_INFO: "/users/update-employer-info",

  // Update Job Seeker Info → PATCH /api/users/update-jobseeker-info
  UPDATE_JOBSEEKER_INFO: "/users/update-jobseeker-info",




  // 💼 EMPLOYER JOB ROUTES (Job CRUD Operations)

  // Create a new job → POST /api/jobs/
  CREATE_JOB: "/jobs/create",

  // Get all jobs (public) → GET /api/jobs/
  EMPLOYER_JOBS: "/jobs",   


  // Delete job by ID → DELETE /api/jobs/:id
  DELETE_JOB: (id) => `/jobs/${id}`,

  // Edit/Update job details → PATCH /api/jobs/:id
  EDIT_JOB: (id) => `/jobs/${id}`,




  // 👨‍💼 JOB SEEKER ROUTES (Applications & Resume)

  // Apply for a job → POST /api/jobseeker/apply/:id
  APPLY_JOB: (id) => `/jobseeker/apply/${id}`,

  // View all jobs applied by current job seeker → GET /api/jobseeker/applied
  VIEW_APPLIED_JOBS: "/jobseeker/applied",

  // Withdraw or Delete job application → DELETE /api/jobseeker/delete/:id
  DELETE_APPLICATION: (id) => `/jobseeker/delete/${id}`,

  // Upload or Update Resume → PATCH /api/jobseeker/update/:id
  UPDATE_APPLICATION: (id) => `/jobseeker/update/${id}`,




  // 🏢 EMPLOYER APPLICATION MANAGEMENT (View + Change Status)

  // View all applications received for employer's jobs → GET /api/employer/applications
  VIEW_APPLICATIONS_BY_EMPLOYER: "/employer/applications",

  // Update application status (Accept / Reject) → PATCH /api/employer/application/:id/status
  UPDATE_APPLICATION_STATUS: (id) => `/employer/application/${id}/status`,




  // 🖼️ FILE UPLOADS (Profile pictures, Resumes, etc.)

  // Upload profile image → POST /api/upload/upload-image
  UPLOAD_IMAGE: "/upload/upload-image",
};

