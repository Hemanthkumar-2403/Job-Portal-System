import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicJobs, applyJob, fetchAppliedJobs } from "../../../redux/jobSlice";
import JobCardSeeker from "../../../components/JobCardseeker";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FindJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jobs, applied, loading, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPublicJobs());
    dispatch(fetchAppliedJobs()); // <-- VERY IMPORTANT
  }, [dispatch]);

  const handleApply = async (job) => {
    if (!user) {
      toast.error("Please login to apply.");
      navigate("/signin");
      return;
    }

    if (user.role !== "jobseeker") {
      toast.error("Only job seekers can apply.");
      return;
    }

    const result = await dispatch(applyJob(job._id));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Applied successfully!");
      dispatch(fetchAppliedJobs()); // refresh applied list
    } else {
      toast.error(result.payload || "Failed to apply");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <h1 className="text-3xl font-semibold mb-5 text-center">Find Jobs</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobs?.map((job) => (
          <JobCardSeeker 
            key={job._id} 
            job={job} 
            onApply={handleApply} 
            appliedJobs={applied}   // <-- SEND LIST HERE
          />
        ))}
      </div>
    </div>
  );
};

export default FindJobs;
