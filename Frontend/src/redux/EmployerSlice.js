// src/redux/employerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

// -------------------------------------
// 1️⃣ Upload Employer Files (logo / profile pic)
// -------------------------------------
export const uploadEmployerFileApi = createAsyncThunk(
  "employer/uploadFile",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API_PATHS.UPLOAD_IMAGE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data; // expected: { success: true, profilePic: "url" } or similar
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "File upload failed"
      );
    }
  }
);

// -------------------------------------
// 2️⃣ Update Employer Info
// -------------------------------------
export const updateEmployerInfoApi = createAsyncThunk(
  "employer/updateInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(API_PATHS.UPDATE_EMPLOYER_INFO, data);
      return res.data.user; // matching your backend's response shape
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Update failed"
      );
    }
  }
);

// -------------------------------------
// Slice
// -------------------------------------
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
      // Upload file
      .addCase(uploadEmployerFileApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadEmployerFileApi.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadEmployerFileApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update employer info
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
