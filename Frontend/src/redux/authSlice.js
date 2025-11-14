// ✅ authSlice.js — Handles all user authentication logic (Signup, Signin, Logout)

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

// ================================================================
// 🔹 STEP 1: Initial State (default data before login)
// ================================================================
const initialState = {
  user: null,         // stores logged-in user details
  loading: false,     // true when API is in progress
  error: null,        // stores any API error message
  success: false,     // used to track if signup/signin worked
};

// ================================================================
// 🔹 STEP 2: Async Thunks (handle API calls)
// ================================================================

// 🟢 Signup User
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API_PATHS.REGISTER, formData);
      return res.data; // backend returns message or user
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// 🟢 Signin User
export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API_PATHS.LOGIN, formData);
      return res.data; // backend returns { user }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signin failed");
    }
  }
);

// 🟢 Forgot Password
export const forgotPasswordUser = createAsyncThunk(
  "auth/forgotPasswordUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(API_PATHS.FORGOT_PASSWORD, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Password reset failed");
    }
  }
);

// 🟢 Logout User
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API_PATHS.LOGOUT);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// ================================================================
// 🔹 STEP 3: Slice (Reducers + extraReducers)
// ================================================================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // 🟠 SIGNUP
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // 🟠 SIGNIN
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 🟠 FORGOT PASSWORD
    builder
      .addCase(forgotPasswordUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotPasswordUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(forgotPasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // 🟠 LOGOUT
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ================================================================
// 🔹 STEP 4: Export reducer
// ================================================================
export default authSlice.reducer;
