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
      return res.data.job;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create job");
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
      return res.data.jobs;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load jobs");
    }
  }
);

// DELETE JOB
export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(API_PATHS.DELETE_JOB(jobId));
      return jobId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete job");
    }
  }
);

// UPDATE JOB
export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, jobData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(API_PATHS.EDIT_JOB(id), jobData);
      return res.data.job;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update job");
    }
  }
);

/* ============================================================
   ⭐ APPLY FOR JOB (Job Seeker)
============================================================ */
export const applyJob = createAsyncThunk(
  "jobs/applyJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API_PATHS.APPLY_JOB(jobId));
      return res.data.data; // backend returns { data: {...} }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to apply");
    }
  }
);

/* ============================================================
   ⭐ VIEW APPLIED JOBS (Job Seeker)
============================================================ */
export const fetchAppliedJobs = createAsyncThunk(
  "jobs/fetchAppliedJobs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(API_PATHS.VIEW_APPLIED_JOBS);

      return res.data.applications;  // ✔ FIXED HERE
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load applied jobs"
      );
    }
  }
);

/* ============================================================
   ⭐ FETCH ALL PUBLIC JOBS
============================================================ */
export const fetchPublicJobs = createAsyncThunk(
  "jobs/fetchPublicJobs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(API_PATHS.PUBLIC_JOBS);
      return res.data.jobs;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load public jobs");
    }
  }
);

/* ============================================================
   ⭐ WITHDRAW JOB APPLICATION
============================================================ */
export const withdrawApplication = createAsyncThunk(
  "jobs/withdrawApplication",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(API_PATHS.DELETE_APPLICATION(id));
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to withdraw application");
    }
  }
);

/* ============================================================
   ⭐ EMPLOYER APPLICATIONS
============================================================ */
export const fetchEmployerApplications = createAsyncThunk(
  "jobs/fetchEmployerApplications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/employer/applications");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load applications");
    }
  }
);

// UPDATE APPLICATION STATUS
export const updateApplicationStatus = createAsyncThunk(
  "jobs/updateApplicationStatus",
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(
        `/employer/application/${applicationId}/status`,
        { status }
      );

      return {
        applicationId,
        status: res.data.data.updatedStatus
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update status");
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
    applied: [],
    applications: [],

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
    /* CREATE JOB */
    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.jobs)) state.jobs = [];
        state.jobs.unshift(action.payload);
        state.success = true; 

      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* APPLY JOB */
    builder.addCase(applyJob.fulfilled, (state, action) => {
      state.loading = false;
    });

    /* FETCH APPLIED JOBS */
    builder
      .addCase(fetchAppliedJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.applied = (action.payload || []).map((app) => ({
          ...app,
          _id: app.id, // fix for delete/compare
        }));
      })
      .addCase(fetchAppliedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* WITHDRAW APPLICATION */
    builder.addCase(withdrawApplication.fulfilled, (state, action) => {
      state.applied = state.applied.filter((app) => app._id !== action.payload);
    });

    /* PUBLIC JOBS */
    builder
      .addCase(fetchPublicJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      });
/* ⭐ FETCH EMPLOYER JOBS */
builder
  .addCase(fetchEmployerJobs.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchEmployerJobs.fulfilled, (state, action) => {
    state.loading = false;
    state.jobs = action.payload || [];
  })
  .addCase(fetchEmployerJobs.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });


  /* ============================================================
   ⭐ EMPLOYER APPLICATIONS
============================================================ */
builder
  .addCase(fetchEmployerApplications.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchEmployerApplications.fulfilled, (state, action) => {
    state.loading = false;
    state.applications = action.payload || [];
  })
  .addCase(fetchEmployerApplications.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  },
});

export const { resetJobSuccess } = jobSlice.actions;
export default jobSlice.reducer;
