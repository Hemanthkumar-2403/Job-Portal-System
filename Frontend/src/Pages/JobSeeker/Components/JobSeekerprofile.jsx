import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadJobseekerFileApi, updateJobseekerInfoApi } from "../../../redux/JobSeekerSlice";
import { validateJobseekerField } from "../../Employer/Validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function JobseekerProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.jobseeker);

  // ------------------------------
  // FORM STATE
  // ------------------------------
  const [formData, setFormData] = useState({
    education: "",
    graduationYear: "",
    experience: "",
    skills: "",
    resume: "",
  });

  const [errors, setErrors] = useState({});

  // FILE STATE
  const [resumeFile, setResumeFile] = useState(null);

  // ------------------------------
  // HANDLE TEXT INPUTS
  // ------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const msg = validateJobseekerField(name, value, {
      ...formData,
      [name]: value,
    });

    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  // ------------------------------
  // RESUME FILE
  // ------------------------------
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);

    if (file) {
      setErrors((prev) => ({ ...prev, resume: "" }));
    }
  };
// ------------------------------
// SUBMIT FORM
// ------------------------------
const handleSubmit = async (e) => {
  e.preventDefault();

  // VALIDATION
  const newErrors = {};
  Object.keys(formData).forEach((key) => {
    newErrors[key] = validateJobseekerField(key, formData[key], formData);
  });

  if (!resumeFile)
    newErrors.resume = "Resume is required";

  setErrors(newErrors);
  if (Object.values(newErrors).some((msg) => msg)) return;

  // 1️⃣ Upload resume
  const resumeFD = new FormData();
  resumeFD.append("image", resumeFile);

  const resumeRes = await dispatch(uploadJobseekerFileApi(resumeFD));
  const resumeURL = resumeRes?.payload?.profilePic;

  // 2️⃣ Update jobseeker info (API call)
  const finalPayload = {
    ...formData,
    skills: formData.skills.split(",").map((s) => s.trim()),
    resume: resumeURL,
  };

  const response = await dispatch(updateJobseekerInfoApi(finalPayload));

  // 3️⃣ ⭐ UPDATE GLOBAL AUTH USER
  if (response.meta.requestStatus === "fulfilled") {
    dispatch(updateUserInfo(response.payload));   // ⭐ SUPER IMPORTANT
    toast.success("Jobseeker Profile Completed!");
    navigate("/find-jobs");
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">

        <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
          Complete Your Jobseeker Profile
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Education */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Education *</label>
            <input
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.education && (
              <p className="text-red-500 text-sm">{errors.education}</p>
            )}
          </div>

          {/* Graduation Year */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Graduation Year *</label>
            <input
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.graduationYear && (
              <p className="text-red-500 text-sm">{errors.graduationYear}</p>
            )}
          </div>

          {/* Experience */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Experience *</label>
            <input
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.experience && (
              <p className="text-red-500 text-sm">{errors.experience}</p>
            )}
          </div>

          {/* Skills */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Skills (comma separated) *</label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="HTML, CSS, JS"
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.skills && (
              <p className="text-red-500 text-sm">{errors.skills}</p>
            )}
          </div>

          {/* Resume Upload */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Upload Resume *</label>
            <input type="file" onChange={handleResumeChange} />
            {errors.resume && (
              <p className="text-red-500 text-sm">{errors.resume}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobseekerProfile;
