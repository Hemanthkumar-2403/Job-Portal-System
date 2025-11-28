import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployerJobs } from "../../redux/jobSlice";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import JobCard from "../../components/JobCard";
import Loader from "../../components/Loader";

export default function EmployerDashboard() {
  const dispatch = useDispatch();

  // NOTE: grab success so we can re-fetch when jobs change elsewhere
  const { jobs, loading, error, success } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // initial fetch
    dispatch(fetchEmployerJobs());

    // re-fetch when tab becomes visible (user returns to tab)
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        dispatch(fetchEmployerJobs());
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
    // include `success` so other job actions can trigger a refresh
  }, [dispatch, success]);

  const handleEdit = (job) => alert("Edit " + job.title);
  const handleDelete = (job) => alert("Delete " + job.title);
  const handleView = (job) => alert("View " + job.title);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={user?.name} />

      <div className="max-w-7xl mx-auto px-4 py-6 lg:flex lg:gap-6">
        <Sidebar />

        <main className="flex-1">
          <h1 className="text-2xl font-semibold mb-4">Employer Dashboard</h1>

          {loading && <Loader />}
          {error && <p className="text-red-500">{error}</p>}

          {/* Empty state */}
          {!loading && (!jobs || jobs.length === 0) && (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-600">You don't have any jobs posted yet.</p>
              <p className="mt-2 text-sm text-gray-500">Click "Post Job" to add one.</p>
            </div>
          )}

          <div className="space-y-3">
            {jobs?.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
