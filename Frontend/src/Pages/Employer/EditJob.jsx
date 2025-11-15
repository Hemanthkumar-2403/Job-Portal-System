import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateJob, fetchEmployerJobs } from "../../redux/jobSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import axiosInstance from "../../utils/axiosInstance";

export default function EditJob() {
  const { id } = useParams(); // job ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.jobs);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    employmentType: "",
    description: "",
    requirements: "",
    responsibilities: "",
    skills: [],
  });

  const skillOptions = [
    "html", "css", "javascript", "react", "node.js",
    "express", "mongodb", "python", "java", "c++",
  ];

  /* ===================================================
       1) LOAD EXISTING JOB DATA INTO FORM  
  =================================================== */
  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await axiosInstance.get(`/jobs/${id}`);
        const job = res.data.job;

        setFormData({
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary,
          employmentType: job.employmentType,
          description: job.description,
          requirements: job.requirements.join("\n"),
          responsibilities: job.responsibilities.join("\n"),
          skills: job.skills,
        });
      } catch (err) {
        toast.error("Failed to load job details");
      }
    };

    loadJob();
  }, [id]);

  /* ===================================================
        2) HANDLE INPUT CHANGE  
  =================================================== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ===================================================
        3) TOGGLE SKILL BUTTON 
  =================================================== */
  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  /* ===================================================
       4) SUBMIT UPDATED JOB  
  =================================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      requirements: formData.requirements.split("\n"),
      responsibilities: formData.responsibilities.split("\n"),
    };

    const result = await dispatch(updateJob({ id, jobData: payload }));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Job updated successfully!");
      dispatch(fetchEmployerJobs());
      navigate("/manage-jobs");
    }

    if (result.meta.requestStatus === "rejected") {
      toast.error("Failed to update job");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6">Edit Job</h2>

      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Job Title *"
          className="w-full border p-2 rounded"
          value={formData.title}
          onChange={handleChange}
        />

        {/* Company */}
        <input
          type="text"
          name="company"
          placeholder="Company Name *"
          className="w-full border p-2 rounded"
          value={formData.company}
          onChange={handleChange}
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location *"
          className="w-full border p-2 rounded"
          value={formData.location}
          onChange={handleChange}
        />

        {/* Salary */}
        <input
          type="text"
          name="salary"
          placeholder="Salary (optional)"
          className="w-full border p-2 rounded"
          value={formData.salary}
          onChange={handleChange}
        />

        {/* Employment Type */}
        <select
          name="employmentType"
          className="w-full border p-2 rounded"
          value={formData.employmentType}
          onChange={handleChange}
        >
          <option value="">Select Employment Type *</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="internship">Internship</option>
        </select>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Job Description *"
          className="w-full border p-2 rounded h-32"
          value={formData.description}
          onChange={handleChange}
        />

        {/* Requirements */}
        <textarea
          name="requirements"
          placeholder="Requirements (one per line) *"
          className="w-full border p-2 rounded h-28"
          value={formData.requirements}
          onChange={handleChange}
        />

        {/* Responsibilities */}
        <textarea
          name="responsibilities"
          placeholder="Responsibilities (one per line) *"
          className="w-full border p-2 rounded h-28"
          value={formData.responsibilities}
          onChange={handleChange}
        />

        {/* Skills */}
        <div className="mt-4">
          <label className="font-medium">Required Skills *</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {skillOptions.map((skill) => (
              <button
                type="button"
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`p-2 rounded border ${
                  formData.skills.includes(skill)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {skill.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
