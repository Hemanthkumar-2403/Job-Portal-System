import React from "react";

export default function JobCard({ job = {}, onEdit, onDelete, onView, onApplicants }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div>
        <h4 className="text-lg font-semibold">{job.title || "Frontend Developer"}</h4>
        <div className="text-sm text-gray-600">
          {job.company || "ACME Corp"} • {job.location || "Remote"}
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Salary: {job.salary || "₹ 25,000 - 50,000"}
        </div>
      </div>

      <div className="flex items-center gap-2">

        <button
          onClick={() => onView?.(job)}
          className="text-sm px-3 py-1 rounded border"
        >
          View
        </button>

        <button
          onClick={() => onEdit?.(job)}
          className="text-sm px-3 py-1 rounded bg-yellow-100"
        >
          Edit
        </button>

        <button
          onClick={() => onApplicants?.(job)}
          className="text-sm px-3 py-1 rounded bg-blue-100 text-blue-700"
        >
          Applicants
        </button>

        <button
          onClick={() => onDelete?.(job)}
          className="text-sm px-3 py-1 rounded bg-red-100 text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
