
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchEmployerApplications,
  updateApplicationStatus,
} from "../../redux/jobSlice";

const Applicants = () => {
  const dispatch = useDispatch();
  const { applications, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchEmployerApplications());
  }, [dispatch]);

  const handleStatusChange = async (applicationId, newStatus) => {
    if (newStatus === "Select") return;

    const result = await dispatch(
      updateApplicationStatus({ applicationId, status: newStatus })
    );

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Status updated!");
    } else {
      toast.error(result.payload || "Failed to update status");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Shortlisted":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Under Review":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Applicants</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3 font-semibold border">Job Title</th>
              <th className="p-3 font-semibold border">Applicant</th>
              <th className="p-3 font-semibold border">Email</th>

              {/* ⭐ NEW PHONE COLUMN */}
              <th className="p-3 font-semibold border">Phone</th>

              {/* ⭐ NEW RESUME COLUMN */}
              <th className="p-3 font-semibold border">Resume</th>

              <th className="p-3 font-semibold border">Status</th>
              <th className="p-3 font-semibold border">Update</th>
            </tr>
          </thead>

          <tbody>
            {applications?.map((app) => (
              <tr key={app.applicationId} className="hover:bg-gray-50 transition">
                <td className="p-3 border">{app.jobTitle}</td>
                <td className="p-3 border">{app.jobSeekerName}</td>
                <td className="p-3 border">{app.jobSeekerEmail}</td>

                {/* ⭐ PHONE DISPLAY */}
                <td className="p-3 border">{app.phone || "NA"}</td>

                {/* ⭐ RESUME DOWNLOAD */}
                <td className="p-3 border">
                  {app.resume ? (
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Download
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </td>

                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="p-3 border">
                  <select
                    className="px-3 py-1 bg-white border rounded shadow-sm"
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
                <td colSpan="7" className="text-center p-6 text-gray-600">
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
