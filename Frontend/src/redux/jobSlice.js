import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

/* ============================================================
   ⭐ CREATE JOB (Employer Post Job)
============================================================ */
export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API_PATHS.CREATE_JOB, jobData);
      return res.data.job; // backend sends { message: "...", job: {...} }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create job"
      );
    }
  }
);

/* ============================================================
   ⭐ FETCH EMPLOYER JOBS
============================================================ */
export const fetchEmployerJobs = createAsyncThunk(
  "jobs/fetchEmployerJobs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(API_PATHS.EMPLOYER_JOBS);
      return res.data.jobs; // backend should send { jobs: [] }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load jobs"
      );
    }
  }
);

/* ============================================================
   ⭐ JOB SLICE
============================================================ */
const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetJobSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    /* ----------------------------------------
       🔵 CREATE JOB
    ---------------------------------------- */
    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createJob.fulfilled, (state, action) => {
  state.loading = false;
  state.success = true;

  // ❗ fix crash
  if (!Array.isArray(state.jobs)) {
    state.jobs = [];
  }

  if (action.payload) {
    state.jobs.unshift(action.payload);
  }
})

.addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    /* ----------------------------------------
       🔵 FETCH EMPLOYER JOBS
    ---------------------------------------- */
    builder
      .addCase(fetchEmployerJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployerJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchEmployerJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetJobSuccess } = jobSlice.actions;
export default jobSlice.reducer;
