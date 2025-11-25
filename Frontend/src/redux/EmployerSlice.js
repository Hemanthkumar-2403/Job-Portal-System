
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

// Upload Company Logo
export const uploadEmployerLogoApi = createAsyncThunk(
  "employer/uploadLogo",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API_PATHS.UPLOAD_COMPANY_LOGO, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logo upload failed");
    }
  }
);

// Upload Profile Pic
export const uploadEmployerProfilePicApi = createAsyncThunk(
  "employer/uploadProfilePic",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API_PATHS.UPLOAD_PROFILE_PIC, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Profile pic upload failed");
    }
  }
);

// Update Employer Info
export const updateEmployerInfoApi = createAsyncThunk(
  "employer/updateInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(API_PATHS.UPDATE_EMPLOYER_INFO, data);
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

const employerSlice = createSlice({
  name: "employer",
  initialState: {
    loading: false,
    error: null,
    employer: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Logo Upload
      .addCase(uploadEmployerLogoApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadEmployerLogoApi.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadEmployerLogoApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Profile Pic Upload
      .addCase(uploadEmployerProfilePicApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadEmployerProfilePicApi.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadEmployerProfilePicApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Employer Info
      .addCase(updateEmployerInfoApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployerInfoApi.fulfilled, (state, action) => {
        state.loading = false;
        state.employer = action.payload;
      })
      .addCase(updateEmployerInfoApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employerSlice.reducer;
