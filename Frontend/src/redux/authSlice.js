import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

/* ===============================
   SIGNUP
================================*/
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API_PATHS.REGISTER, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

/* ===============================
   SIGNIN
================================*/
export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API_PATHS.LOGIN, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signin failed");
    }
  }
);

/* ===============================
   CHECK SESSION (/auth/me) — AUTO LOGIN
================================*/
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(API_PATHS.ME);
      return res.data.user;
    } catch (error) {
      return rejectWithValue(null); // Not logged in
    }
  }
);

/* ===============================
   FORGOT PASSWORD
================================*/
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

/* ===============================
   LOGOUT
================================*/
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

/* ===============================
   SLICE
================================*/
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    updateUserInfo: (state, action) => {
      if (action.payload) {
    state.user = action.payload; // save whole user object
      }
    },
  },

  extraReducers: (builder) => {
    builder
      /* SIGNUP */
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* SIGNIN */
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CHECK AUTH (AUTO LOGIN ON REFRESH) */
      .addCase(checkAuth.pending, (state) => {
        state.loading = false; // prevent UI blocking
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })

      /* FORGOT PASSWORD */
      .addCase(forgotPasswordUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotPasswordUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(forgotPasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* LOGOUT */
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

export const { updateUserInfo } = authSlice.actions;
export default authSlice.reducer;
