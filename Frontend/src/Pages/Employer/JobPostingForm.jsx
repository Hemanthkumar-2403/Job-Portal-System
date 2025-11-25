
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJob, resetJobSuccess } from "../../redux/jobSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.jobs);

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
    "express", "mongodb", "python", "java", "c++"
  ];

  // Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Skills Toggle
  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.employmentType ||
      !formData.description ||
      !formData.requirements ||
      !formData.responsibilities ||
      formData.skills.length === 0
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    dispatch(createJob(formData));
  };

  useEffect(() => {
    if (success) {
      toast.success("Job Posted Successfully!");
      dispatch(resetJobSuccess());
      navigate("/manage-jobs");
    }
    if (error) toast.error(error);
  }, [success, error, navigate, dispatch]);

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>

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
                className={`p-2 rounded border 
                  ${formData.skills.includes(skill)
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
          {loading ? "Posting..." : "Post Job"}
        </button>

      </form>
    </div>
  );
};

export default PostJob;
