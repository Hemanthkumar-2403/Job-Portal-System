import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppliedJobs, withdrawApplication } from "../../../redux/jobSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AppliedJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { applied, loading, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    dispatch(fetchAppliedJobs());
  }, [dispatch, user]);

  const handleWithdraw = async (id) => {
    const result = await dispatch(withdrawApplication(id));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Application withdrawn");
    } else {
      toast.error("Failed to withdraw");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <h1 className="text-3xl font-semibold mb-5">My Applications</h1>

      {loading && <p className="text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && applied.length === 0 && (
  <p className="text-center text-gray-600">No applications yet</p>
)}


      <div className="space-y-4">
        {applied.map((app) => (
          <div
            key={app._id}
            className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{app.jobTitle}</h2>
              <p className="text-gray-600">
                {app.company} • {app.location}
              </p>

              <p className="text-sm mt-1 text-blue-600">
                Status: {app.status}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Applied on: {new Date(app.appliedAt).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={() => handleWithdraw(app._id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Withdraw
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
