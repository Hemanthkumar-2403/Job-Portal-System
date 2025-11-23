import React from "react";

export default function JobCardSeeker({ job, onApply, appliedJobs = [] }) {
  
  const alreadyApplied = appliedJobs.some(app => app.jobId === job._id);

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm flex flex-col gap-3">
      
      <div>
        <h2 className="text-xl font-semibold">{job.title}</h2>
        <p className="text-gray-600">{job.company} • {job.location}</p>
        <p className="text-sm text-gray-600 mt-1">Salary: {job.salary}</p>
      </div>

      {alreadyApplied ? (
        <button
          className="w-full bg-gray-400 text-white py-2 rounded-md cursor-not-allowed"
          disabled
        >
          ✔ Applied
        </button>
      ) : (
        <button
          onClick={() => onApply(job)}
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Apply Now
        </button>
      )}

    </div>
  );
}
