
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployerJobs } from "../../redux/jobSlice";
import Navbar from "../../components/Navbar";
import JobCard from "../../components/JobCard";
import Loader from "../../components/Loader";

export default function EmployerDashboard() {
  const dispatch = useDispatch();

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchEmployerJobs());
    }
  }, [dispatch, user]);

  const handleEdit = (job) => alert("Edit " + job.title);
  const handleDelete = (job) => alert("Delete " + job.title);
  const handleView = (job) => alert("View " + job.title);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={user?.name} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <main className="flex-1">
          <h1 className="text-2xl font-semibold mb-4">Employer Dashboard</h1>

          {loading && <Loader />}
          {error && <p className="text-red-500">{error}</p>}

          <div className="space-y-3">
            {jobs?.length > 0 ? (
              jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                />
              ))
            ) : (
              <p className="text-gray-600">No jobs found</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
