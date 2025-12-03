import React, { useState, useEffect } from "react";
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

  const { user } = useSelector((state) => state.auth);
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

  // ⭐ PREFILL LOGIC: Preload existing data when user opens page
  useEffect(() => {
    if (user?.employer) {
      setFormData({
        companyName: user.employer.companyName || "",
        companyDescription: user.employer.companyDescription || "",
      });

      // ⭐ EXISTING PREVIEW
      if (user.employer.companyLogo) {
        setCompanyLogoPreview(user.employer.companyLogo);
      }

      if (user.employer.profilePic) {
        setProfilePicPreview(user.employer.profilePic);
      }
    }
  }, [user]);

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

    setErrors(newErrors);
    if (Object.values(newErrors).some((msg) => msg)) return;

    try {
      let logoUrl = user?.employer?.companyLogo || null;
      let profileUrl = user?.employer?.profilePic || null;

      // Only upload new files if selected
      if (companyLogoFile) {
        const fd = new FormData();
        fd.append("image", companyLogoFile);
        const res = await dispatch(uploadEmployerLogoApi(fd));
        logoUrl = res.payload.fileUrl;
      }

      if (profilePicFile) {
        const fd = new FormData();
        fd.append("image", profilePicFile);
        const res = await dispatch(uploadEmployerProfilePicApi(fd));
        profileUrl = res.payload.fileUrl;
      }

      const payload = {
        companyName: formData.companyName,
        companyDescription: formData.companyDescription,
        companyLogo: logoUrl,
        profilePic: profileUrl,
        profileCompleted: true
      };

      const response = await dispatch(updateEmployerInfoApi(payload));

      if (response.meta.requestStatus === "fulfilled") {
dispatch(updateUserInfo(response.payload));

        toast.success("Employer profile updated!");
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
          </div>

          {/* Profile Pic */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Profile Picture *</label>
            <input type="file" accept="image/*" onChange={handleProfilePicChange} />
            {profilePicPreview && <img src={profilePicPreview} className="h-24 mt-2 rounded-full" />}
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
