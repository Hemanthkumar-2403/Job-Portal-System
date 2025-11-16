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

// DELETE JOB
export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(API_PATHS.DELETE_JOB(jobId));
      return jobId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete job"
      );
    }
  }
);


//updateJob
export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, jobData }, { rejectWithValue }) => {
    try {
    const res = await axiosInstance.patch(API_PATHS.EDIT_JOB(id), jobData);
      return res.data.job;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update job"
      );
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
      return res.data.data;   // application data
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to apply"
      );
    }
  }
);


/* ============================================================
   ⭐ VIEW ALL APPLIED JOBS (Job Seeker)
============================================================ */
export const fetchAppliedJobs = createAsyncThunk(
  "jobs/fetchAppliedJobs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(API_PATHS.VIEW_APPLIED_JOBS);
      return res.data.applications;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load applied jobs"
      );
    }
  }
);


// FETCH ALL PUBLIC JOBS (For JobSeeker Find Jobs Page)
export const fetchAllJobs = createAsyncThunk(
  "jobs/fetchAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/jobs"); // public route
      return res.data.jobs;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load jobs"
      );
    }
  }
);


/* ============================================================
   ⭐ DELETE / WITHDRAW JOB APPLICATION (Job Seeker)
============================================================ */
export const withdrawApplication = createAsyncThunk(
  "jobs/withdrawApplication",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(API_PATHS.DELETE_APPLICATION(id));
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to withdraw application"
      );
    }
  }
);


/* ============================================================
   ⭐ FETCH ALL PUBLIC JOBS (Job Seeker)
============================================================ */
export const fetchPublicJobs = createAsyncThunk(
  "jobs/fetchPublicJobs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(API_PATHS.PUBLIC_JOBS);
      return res.data.jobs;   // backend returns { jobs: [...] }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load public jobs"
      );
    }
  }
);

//fetchEmployerApplications
export const fetchEmployerApplications = createAsyncThunk(
  "jobs/fetchEmployerApplications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/employer/applications");
      return res.data.data; // array of applications
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load applications"
      );
    }
  }
);


//updateApplicationStatus
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
        status: res.data.data.updatedStatus, 
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update status"
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
    applied: [],  // jobseeker
    applications: [], // applocTIONS

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
      })

// delete jobs
  .addCase(deleteJob.fulfilled, (state, action) => {
  state.loading = false;
  state.jobs = state.jobs.filter((job) => job._id !== action.payload);
})
.addCase(deleteJob.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(deleteJob.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
}) 

//updateJob
.addCase(updateJob.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(updateJob.fulfilled, (state, action) => {
  state.loading = false;
  state.jobs = state.jobs.map((job) =>
    job._id === action.payload._id ? action.payload : job
  );
})
.addCase(updateJob.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});



// APPLY JOB   jobseeker
builder
  .addCase(applyJob.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(applyJob.fulfilled, (state, action) => {
    state.loading = false;
  })
  .addCase(applyJob.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

// FETCH APPLIED JOBS
builder
  .addCase(fetchAppliedJobs.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
    state.loading = false;
    state.applied = action.payload; // new state field
  })
  .addCase(fetchAppliedJobs.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  builder
  .addCase(fetchAllJobs.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchAllJobs.fulfilled, (state, action) => {
    state.loading = false;
    state.allJobs = action.payload;
  })
  .addCase(fetchAllJobs.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });


// WITHDRAW APPLICATION
builder
  .addCase(withdrawApplication.fulfilled, (state, action) => {
    state.applied = state.applied.filter(
      (app) => app._id !== action.payload
    );
  });

// FETCH PUBLIC JOBS (Job Seeker)
builder
  .addCase(fetchPublicJobs.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchPublicJobs.fulfilled, (state, action) => {
    state.loading = false;
    state.jobs = action.payload;  // store public jobs
  })
  .addCase(fetchPublicJobs.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  // FETCH EMPLOYER APPLICATIONS
builder
  .addCase(fetchEmployerApplications.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchEmployerApplications.fulfilled, (state, action) => {
    state.loading = false;
    state.applications = action.payload;
  })
  .addCase(fetchEmployerApplications.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });


// UPDATE APPLICATION STATUS
builder.addCase(updateApplicationStatus.fulfilled, (state, action) => {
  state.applications = state.applications.map((app) =>
    app.applicationId === action.payload.applicationId
      ? { ...app, status: action.payload.status }
      : app
  );
});

  },
});

export const { resetJobSuccess } = jobSlice.actions;
export default jobSlice.reducer;
