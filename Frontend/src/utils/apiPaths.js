export const API_PATHS = {
  // 🔐 AUTH ROUTES
  REGISTER: "/auth/signup",
  LOGIN: "/auth/signin",
  FORGOT_PASSWORD: "/auth/forgot_password",
  LOGOUT: "/auth/logout",

  // 👤 USER ROUTES
  UPDATE_EMPLOYER_INFO: "/users/update-employer-info",
  UPDATE_JOBSEEKER_INFO: "/users/update-jobseeker-info",

  // 💼 EMPLOYER JOB ROUTES
  CREATE_JOB: "/jobs/create",
  EMPLOYER_JOBS: "/jobs",
  DELETE_JOB: (id) => `/jobs/${id}`,
  EDIT_JOB: (id) => `/jobs/${id}`,

  // 🔹 NEW → PUBLIC JOB LISTING (Job Seekers)
  PUBLIC_JOBS: "/public-jobs",

  // 👨‍💼 JOB SEEKER ROUTES (Applications)
  APPLY_JOB: (id) => `/jobseeker/apply/${id}`,
  VIEW_APPLIED_JOBS: "/jobseeker/applied",
  DELETE_APPLICATION: (id) => `/jobseeker/delete/${id}`,
  UPDATE_APPLICATION: (id) => `/jobseeker/update/${id}`,

  // 🏢 EMPLOYER APPLICATIONS
  VIEW_APPLICATIONS_BY_EMPLOYER: "/employer/applications",
  UPDATE_APPLICATION_STATUS: (id) => `/employer/application/${id}/status`,

  // 🖼️ FILE UPLOAD
  UPLOAD_IMAGE: "/upload/upload-image",
};
