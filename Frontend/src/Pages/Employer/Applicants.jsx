import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployerApplications,
  updateApplicationStatus,} from "../../redux/jobSlice";
import { toast } from "react-toastify";

const Applicants = () => {
  const dispatch = useDispatch();
  const { applications, loading, error } = useSelector(
    (state) => state.jobs
  );

  // Load all applications on page load
  useEffect(() => {
    dispatch(fetchEmployerApplications());
  }, [dispatch]);

  // Handle Status Change
  const handleStatusChange = async (applicationId, newStatus) => {
    const result = await dispatch(
      updateApplicationStatus({ applicationId, status: newStatus })
    );

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Status updated!");
    } else {
      toast.error(result.payload || "Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Applicants</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Job Title</th>
              <th className="border p-2">Applicant</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Update</th>
            </tr>
          </thead>

          <tbody>
            {applications?.map((app) => (
              <tr key={app.applicationId}>
                <td className="border p-2">{app.jobTitle}</td>
                <td className="border p-2">{app.jobSeekerName}</td>
                <td className="border p-2">{app.jobSeekerEmail}</td>

                <td className="border p-2">
                  <span className="px-2 py-1 rounded bg-gray-200">
                    {app.status}
                  </span>
                </td>

                <td className="border p-2">
                  <select
                    className="border p-1"
                    onChange={(e) =>
                      handleStatusChange(app.applicationId, e.target.value)
                    }
                  >
                    <option>Select</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}

            {applications?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applicants;
