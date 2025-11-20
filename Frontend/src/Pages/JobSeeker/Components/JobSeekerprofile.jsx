
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadJobseekerProfilePicApi,
  uploadJobseekerResumeApi,
  updateJobseekerInfoApi,
} from "../../../redux/JobSeekerSlice";

import { updateUserInfo } from "../../../redux/authSlice";
import { validateJobseekerField } from "../../JobSeeker/Components/Validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function JobseekerProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.jobseeker);

  const [formData, setFormData] = useState({
    education: "",
    graduationYear: "",
    experience: "",
    skills: "",
    profilePic: "",
    resume: "",
  });

  const [errors, setErrors] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);

  // ---------------------------
  // TEXT CHANGE
  // ---------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const msg = validateJobseekerField(name, value, { ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  // ---------------------------
  // PROFILE PIC CHANGE
  // ---------------------------
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);

    if (file) setErrors((prev) => ({ ...prev, profilePic: "" }));
  };

  // ---------------------------
  // RESUME CHANGE
  // ---------------------------
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);

    if (file) setErrors((prev) => ({ ...prev, resume: "" }));
  };

  // ---------------------------
  // SUBMIT FORM
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateJobseekerField(key, formData[key], formData);
    });

    if (!resumeFile) newErrors.resume = "Resume is required";
    if (!profilePicFile) newErrors.profilePic = "Profile picture is required";

    setErrors(newErrors);
    if (Object.values(newErrors).some((msg) => msg)) return;

    try {
      // 1️⃣ Upload Profile Picture
      const picFD = new FormData();
      picFD.append("image", profilePicFile);

      const picRes = await dispatch(uploadJobseekerProfilePicApi(picFD));
      const profilePicURL = picRes?.payload?.fileUrl || "";

      // 2️⃣ Upload Resume
      const resumeFD = new FormData();
      resumeFD.append("resume", resumeFile);

      const resumeRes = await dispatch(uploadJobseekerResumeApi(resumeFD));
      const resumeURL = resumeRes?.payload?.fileUrl || "";

      // 3️⃣ Final Data
      const finalPayload = {
        education: formData.education,
        graduationYear: formData.graduationYear,
        experience: formData.experience,
        skills: formData.skills.split(",").map((s) => s.trim()),
        profilePic: profilePicURL,
        resume: resumeURL,
        profileCompleted: true,
      };

      const response = await dispatch(updateJobseekerInfoApi(finalPayload));

      dispatch(updateUserInfo({ user: response.payload }));
      toast.success("Jobseeker Profile Completed!");
      navigate("/find-jobs");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold text-center mb-4">Complete Your Jobseeker Profile</h2>

        <form onSubmit={handleSubmit}>
          {/* Profile Picture */}
<div className="mb-4">
  <label className="block font-medium mb-2">Profile Picture *</label>

  {/* Preview Circle */}
  {profilePicFile ? (
    <img
      src={URL.createObjectURL(profilePicFile)}
      alt="preview"
      className="w-24 h-24 rounded-full object-cover mx-auto mb-2 border"
    />
  ) : (
    <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center">
      <span className="text-gray-500 text-sm">No Image</span>
    </div>
  )}

  {/* File Input */}
  <input
    type="file"
    accept="image/*"
    onChange={handleProfilePicChange}
    className="mt-2"
  />

  {errors.profilePic && (
    <p className="text-red-500 text-sm">{errors.profilePic}</p>
  )}
</div>


          {/* Education */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Education *</label>
            <input
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.education && <p className="text-red-500 text-sm">{errors.education}</p>}
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
            {errors.graduationYear && <p className="text-red-500 text-sm">{errors.graduationYear}</p>}
          </div>

          {/* Experience - Dropdown */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Experience *</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select experience</option>
              <option value="0">Fresher (0 Years)</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3-5">3–5 Years</option>
              <option value="5-8">5–8 Years</option>
              <option value="8+">8+ Years</option>
            </select>

            {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
          </div>

          {/* Skills */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Skills *</label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="HTML, CSS, JavaScript"
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
          </div>

          {/* Resume Upload */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Upload Resume *</label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />
            {errors.resume && <p className="text-red-500 text-sm">{errors.resume}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobseekerProfile;
