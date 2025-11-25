
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadEmployerLogoApi,
  uploadEmployerProfilePicApi,
  updateEmployerInfoApi,
} from "../../redux/EmployerSlice";

import { updateUserInfo } from "../../redux/authSlice";
import { validateEmployerField } from "../Employer/Validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EmployerProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.employer);

  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
  });

  const [errors, setErrors] = useState({});

  const [companyLogoFile, setCompanyLogoFile] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);

  const [companyLogoPreview, setCompanyLogoPreview] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  const validateImage = (file) => {
    if (!file) return "File required";

    if (file.size > 2 * 1024 * 1024) return "File must be < 2MB";

    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.type)) return "Only JPG, JPEG, PNG allowed";

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const msg = validateEmployerField(name, value, { ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    const msg = validateImage(file);
    if (msg) return toast.error(msg);

    setCompanyLogoFile(file);
    setCompanyLogoPreview(URL.createObjectURL(file));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];

    const msg = validateImage(file);
    if (msg) return toast.error(msg);

    setProfilePicFile(file);
    setProfilePicPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      companyName: validateEmployerField("companyName", formData.companyName, formData),
      companyDescription: validateEmployerField("companyDescription", formData.companyDescription, formData),
    };

    if (!companyLogoFile) newErrors.companyLogo = "Company logo required";
    if (!profilePicFile) newErrors.profilePic = "Profile picture required";

    setErrors(newErrors);
    if (Object.values(newErrors).some((msg) => msg)) return;

    try {
      // Upload Logo
      const logoFD = new FormData();
      logoFD.append("image", companyLogoFile);
      const logoRes = await dispatch(uploadEmployerLogoApi(logoFD));

      // Upload Profile Pic
      const picFD = new FormData();
      picFD.append("image", profilePicFile);
      const picRes = await dispatch(uploadEmployerProfilePicApi(picFD));

      const payload = {
        companyName: formData.companyName,
        companyDescription: formData.companyDescription,
        companyLogo: logoRes.payload.fileUrl,
        profilePic: picRes.payload.fileUrl,
        profileCompleted: true,
      };

      const response = await dispatch(updateEmployerInfoApi(payload));

      if (response.meta.requestStatus === "fulfilled") {
        dispatch(updateUserInfo({ user: response.payload }));
        toast.success("Employer profile completed!");
        navigate("/employer-dashboard");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold text-center mb-4">Complete Your Employer Profile</h2>

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
            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
          </div>

          {/* Description */}
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
            {companyLogoPreview && <img src={companyLogoPreview} className="h-24 mt-2 rounded-md" />}
            {errors.companyLogo && <p className="text-red-500 text-sm">{errors.companyLogo}</p>}
          </div>

          {/* Profile Pic */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Profile Picture *</label>
            <input type="file" accept="image/*" onChange={handleProfilePicChange} />
            {profilePicPreview && <img src={profilePicPreview} className="h-24 mt-2 rounded-full" />}
            {errors.profilePic && <p className="text-red-500 text-sm">{errors.profilePic}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployerProfile;
