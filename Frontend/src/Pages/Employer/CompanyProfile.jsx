import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { checkAuth } from "../../redux/authSlice";
import { toast } from "react-toastify";

function CompanyProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [selectedLogo, setSelectedLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  const employer = user.employer || {};

  // When user selects a new logo
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedLogo(file);
      setPreviewLogo(URL.createObjectURL(file)); // preview before upload
    }
  };

  // Upload logo to backend
  const handleUploadLogo = async () => {
    if (!selectedLogo) {
      toast.error("Please select a logo first");
      return;
    }

    const formData = new FormData();
    formData.append("companyLogo", selectedLogo);

    try {
      const res = await axiosInstance.post(
        "/users/upload-company-logo",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Company logo updated!");

      // Refresh user info from backend
      dispatch(checkAuth());

      // Reset
      setSelectedLogo(null);
      setPreviewLogo(null);

    } catch (err) {
      toast.error("Failed to upload logo");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md p-8 rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-6">Company Profile</h2>

      {/* Company Logo */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Company Logo</label>

        <img
          src={previewLogo || employer.companyLogo || "/no-logo.png"}
          alt="Company Logo"
          className="h-24 w-24 rounded-md border object-cover"
        />

        <div className="mt-3">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="logoUpload"
            onChange={handleLogoChange}
          />
          <label
            htmlFor="logoUpload"
            className="cursor-pointer text-blue-600 underline"
          >
            Change Logo
          </label>
        </div>

        {selectedLogo && (
          <button
            onClick={handleUploadLogo}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Upload New Logo
          </button>
        )}
      </div>

      {/* Company Name */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Company Name</label>
        <p className="text-gray-700 border p-3 rounded bg-gray-50">
          {employer.companyName}
        </p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Company Description</label>
        <p className="text-gray-700 border p-3 rounded bg-gray-50 leading-relaxed">
          {employer.companyDescription}
        </p>
      </div>

      {/* Employer Profile Pic */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Employer Profile Picture</label>
        <img
          src={user.profilePic || "/default-user.png"}
          alt="Profile"
          className="h-24 w-24 rounded-full border object-cover"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Email</label>
        <p className="text-gray-700 border p-3 rounded bg-gray-50">
          {user.email}
        </p>
      </div>
    </div>
  );
}

export default CompanyProfile;
