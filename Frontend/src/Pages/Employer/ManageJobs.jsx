import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployerJobs } from "../../redux/jobSlice";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

export default function ManageJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchEmployerJobs());
  }, [dispatch]);

  const handleEdit = (id) => navigate(`/edit-job/${id}`);
  const handleDelete = (id) => navigate(`/delete-job/${id}`);
  const handleViewApplicants = () => navigate("/applied-jobs");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={user?.name} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <main className="flex-1">
          <h1 className="text-2xl font-semibold mb-4">Manage Jobs</h1>

          {loading && <Loader />}
          {error && <p className="text-red-500">{error}</p>}

          <div className="space-y-4">
            {jobs?.map((job) => (
              <div
                key={job._id}
                className="border p-4 bg-white rounded-xl shadow-sm flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-bold">{job.title}</h2>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.location}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(job._id)}
                    className="px-4 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(job._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>

                  <button
                    onClick={handleViewApplicants}
                    className="px-4 py-1 bg-gray-700 text-white rounded"
                  >
                    Applicants
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
