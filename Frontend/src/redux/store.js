
// ✅ store.js
// This is the main Redux "brain" — it keeps all slices together.

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Import the slice we’ll create below
import jobReducer from "./jobSlice";
import employerReducer from "./EmployerSlice"
import jobseekerReducer from "./JobSeekerSlice"


// 🧠 configureStore() is a helper from Redux Toolkit that creates the store easily
// It automatically sets up Redux DevTools and middleware (like thunk)



// 🧠 Create and export the store
export const store = configureStore({
  reducer: {
    // Each slice (like auth, jobs, etc.) goes here as a key:value pair

    auth: authReducer, // we can add more slices later (like jobSlice)
     jobs: jobReducer,   
    employer: employerReducer,
    jobseeker: jobseekerReducer, 

  },
});
