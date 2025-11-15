import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteJob } from "../../redux/jobSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function DeleteJob() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.jobs);

  const handleDelete = async () => {
    const result = await dispatch(deleteJob(id));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Job deleted successfully!");
      navigate("/manage-jobs");
    } else {
      toast.error(error || "Failed to delete job");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-6 rounded-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center text-red-600">
          Delete Job?
        </h2>

        <p className="text-gray-700 mb-6 text-center">
          Are you sure you want to delete this job? This action cannot be undone.
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
