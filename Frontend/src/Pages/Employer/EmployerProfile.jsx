import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadEmployerFileApi, updateEmployerInfoApi } from "..//../redux/EmployerSlice";
import { validateEmployerField } from "../Employer/Validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EmployerProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.employer);

  // ------------------------------
  // FORM STATE
  // ------------------------------
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    companyLogo: "",
    profilePic: "",
  });

  const [errors, setErrors] = useState({});

  // ------------------------------
  // FILE STATES
  // ------------------------------
  const [companyLogoFile, setCompanyLogoFile] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);

  // Preview Images
  const [companyLogoPreview, setCompanyLogoPreview] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  // ------------------------------
  // HANDLE TEXT INPUTS
  // ------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const msg = validateEmployerField(name, value, {
      ...formData,
      [name]: value,
    });
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  // ------------------------------
  // COMPANY LOGO FILE
  // ------------------------------
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setCompanyLogoFile(file);

    const reader = new FileReader();
    reader.onload = () => setCompanyLogoPreview(reader.result);
    reader.readAsDataURL(file);

    setErrors((prev) => ({ ...prev, companyLogo: "" }));
  };

  // ------------------------------
  // PROFILE PIC FILE
  // ------------------------------
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);

    const reader = new FileReader();
    reader.onload = () => setProfilePicPreview(reader.result);
    reader.readAsDataURL(file);

    setErrors((prev) => ({ ...prev, profilePic: "" }));
  };

  // ------------------------------
// SUBMIT FORM
// ------------------------------
const handleSubmit = async (e) => {
  e.preventDefault();

  // VALIDATION
  const newErrors = {};
  Object.keys(formData).forEach((key) => {
    newErrors[key] = validateEmployerField(key, formData[key], formData);
  });

  if (!companyLogoFile)
    newErrors.companyLogo = "Company logo is required";

  if (!profilePicFile)
    newErrors.profilePic = "Profile picture is required";

  setErrors(newErrors);
  if (Object.values(newErrors).some((msg) => msg)) return;

  // ------------------------------
  // 1️⃣ UPLOAD COMPANY LOGO
  // ------------------------------
  const logoFD = new FormData();
  logoFD.append("image", companyLogoFile);

  const logoRes = await dispatch(uploadEmployerFileApi(logoFD));
  const logoURL = logoRes?.payload?.profilePic;

  // ------------------------------
  // 2️⃣ UPLOAD PROFILE PIC
  // ------------------------------
  const picFD = new FormData();
  picFD.append("image", profilePicFile);

  const picRes = await dispatch(uploadEmployerFileApi(picFD));
  const picURL = picRes?.payload?.profilePic;

  // ------------------------------
  // 3️⃣ UPDATE EMPLOYER INFO (API CALL)
  // ------------------------------
  const finalPayload = {
    ...formData,
    companyLogo: logoURL,
    profilePic: picURL,
  };

  const response = await dispatch(updateEmployerInfoApi(finalPayload));

  // ------------------------------
  // 4️⃣ UPDATE AUTH USER IN REDUX
  // ------------------------------
  if (response.meta.requestStatus === "fulfilled") {
    dispatch(updateUserInfo(response.payload)); // ⭐ SUPER IMPORTANT
    toast.success("Employer Profile Completed!");
    navigate("/employer-dashboard");
  }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">

        <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
          Complete Your Employer Profile
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Company Name */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Company Name *</label>
            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm">{errors.companyName}</p>
            )}
          </div>

          {/* Company Description */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Company Description *</label>
            <textarea
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.companyDescription && (
              <p className="text-red-500 text-sm">{errors.companyDescription}</p>
            )}
          </div>

          {/* Company Logo */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Company Logo *</label>
            <input type="file" accept="image/*" onChange={handleLogoChange} />
            {errors.companyLogo && (
              <p className="text-red-500 text-sm">{errors.companyLogo}</p>
            )}

            {companyLogoPreview && (
              <img
                src={companyLogoPreview}
                className="h-24 mt-2 rounded-md"
                alt="Company Logo Preview"
              />
            )}
          </div>

          {/* Profile Picture */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Profile Picture *</label>
            <input type="file" accept="image/*" onChange={handleProfilePicChange} />
            {errors.profilePic && (
              <p className="text-red-500 text-sm">{errors.profilePic}</p>
            )}

            {profilePicPreview && (
              <img
                src={profilePicPreview}
                className="h-24 mt-2 rounded-full"
                alt="Profile Preview"
              />
            )}
          </div>

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

export default EmployerProfile;
