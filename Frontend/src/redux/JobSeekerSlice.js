import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

// -------------------------------------
// 1️⃣ Upload Jobseeker Profile Pic (.jpg/.png)
// -------------------------------------
export const uploadJobseekerProfilePicApi = createAsyncThunk(
  "jobseeker/uploadPic",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API_PATHS.UPLOAD_IMAGE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data; // returns { fileUrl }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Image upload failed"
      );
    }
  }
);

// -------------------------------------
// 2️⃣ Upload Resume (.pdf, .doc, .docx)
// -------------------------------------
export const uploadJobseekerResumeApi = createAsyncThunk(
  "jobseeker/uploadResume",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API_PATHS.UPLOAD_RESUME, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data; // returns { fileUrl }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Resume upload failed"
      );
    }
  }
);

// -------------------------------------
// 3️⃣ Update Jobseeker Profile
// -------------------------------------
export const updateJobseekerInfoApi = createAsyncThunk(
  "jobseeker/updateInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(
        API_PATHS.UPDATE_JOBSEEKER_INFO,
        data
      );
      return res.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Update failed"
      );
    }
  }
);

// Slice
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

      // PROFILE PIC UPLOAD
      .addCase(uploadJobseekerProfilePicApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadJobseekerProfilePicApi.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadJobseekerProfilePicApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // RESUME UPLOAD
      .addCase(uploadJobseekerResumeApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadJobseekerResumeApi.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadJobseekerResumeApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE JOBSEEKER INFO
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
