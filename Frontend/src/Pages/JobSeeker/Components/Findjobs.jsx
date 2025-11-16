import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicJobs, applyJob } from "../../../redux/jobSlice";
import JobCardSeeker from "../../../components/JobCardseeker";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FindJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  // Load all public jobs
  useEffect(() => {
    dispatch(fetchPublicJobs());
  }, [dispatch]);

  // Apply for Job
  const handleApply = async (job) => {
    if (!user) {
      toast.error("Please login to apply for this job.");
      navigate("/signin");
      return;
    }

    if (user.role !== "jobseeker") {
      toast.error("Only job seekers can apply for jobs.");
      return;
    }

    const result = await dispatch(applyJob(job._id));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Applied successfully!");
    } else {
      toast.error(result.payload || "Failed to apply");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <h1 className="text-3xl font-semibold mb-5 text-center">Find Jobs</h1>

      {loading && <p className="text-center text-gray-500">Loading jobs...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobs?.map((job) => (
          <JobCardSeeker key={job._id} job={job} onApply={handleApply} />
        ))}
      </div>
    </div>
  );
};

export default FindJobs;
