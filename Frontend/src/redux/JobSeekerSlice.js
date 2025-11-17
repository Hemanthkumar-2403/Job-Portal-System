import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

// -------------------------------------
// 1️⃣ Upload Resume
// -------------------------------------
export const uploadJobseekerFileApi = createAsyncThunk(
  "jobseeker/uploadFile",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API_PATHS.UPLOAD_IMAGE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "File upload failed"
      );
    }
  }
);

// -------------------------------------
// 2️⃣ Update Jobseeker Info
// -------------------------------------
export const updateJobseekerInfoApi = createAsyncThunk(
  "jobseeker/updateInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(API_PATHS.UPDATE_JOBSEEKER_INFO, data);
      return res.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Update failed"
      );
    }
  }
);

// -------------------------------------
const jobseekerSlice = createSlice({
  name: "jobseeker",
  initialState: {
    loading: false,
    error: null,
    jobseeker: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(uploadJobseekerFileApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadJobseekerFileApi.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadJobseekerFileApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateJobseekerInfoApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateJobseekerInfoApi.fulfilled, (state, action) => {
        state.loading = false;
        state.jobseeker = action.payload;
      })
      .addCase(updateJobseekerInfoApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobseekerSlice.reducer;
