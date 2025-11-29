
export const API_PATHS = {
  // AUTH
  REGISTER: "/auth/signup",
  LOGIN: "/auth/signin",
  FORGOT_PASSWORD: "/auth/forgot-password",
  LOGOUT: "/auth/logout",
  ME: "/auth/me",


  // USER PROFILE UPDATE
  UPDATE_EMPLOYER_INFO: "/users/update-employer-info",
  UPDATE_JOBSEEKER_INFO: "/users/update-jobseeker-info",

  // EMPLOYER UPLOADS
  UPLOAD_PROFILE_PIC: "/users/upload-profile-pic",
  UPLOAD_COMPANY_LOGO: "/users/upload-company-logo",

  // JOBSEEKER UPLOAD
  UPLOAD_RESUME: "/users/upload-resume",

  // JOB ROUTES
  CREATE_JOB: "/jobs/create",
  EMPLOYER_JOBS: "/jobs",
  DELETE_JOB: (id) => `/jobs/${id}`,
  EDIT_JOB: (id) => `/jobs/${id}`,

  PUBLIC_JOBS: "/public-jobs",

  APPLY_JOB: (id) => `/jobseeker/apply/${id}`,
  VIEW_APPLIED_JOBS: "/jobseeker/applied",
  DELETE_APPLICATION: (id) => `/jobseeker/delete/${id}`,
  UPDATE_APPLICATION: (id) => `/jobseeker/update/${id}`,

  VIEW_APPLICATIONS_BY_EMPLOYER: "/employer/applications",
  UPDATE_APPLICATION_STATUS: (id) => `/employer/application/${id}/status`,
};
