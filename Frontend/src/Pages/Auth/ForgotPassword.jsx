import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateForgotPasswordField } from "./Validation";
import { forgotPasswordUser } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

function ForgotPassword() {
  const dispatch = useDispatch();

  // Access global auth state
  const { loading, success, error, user } = useSelector((state) => state.auth);


  // Local form state
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  
  // 🚫 If user already logged in → redirect
  if (user) {
    return (
      <Navigate
        to={user.role === "jobseeker" ? "/find-jobs" : "/employer-dashboard"}
        replace
      />
    );
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateForgotPasswordField(name, value, {
      ...formData,
      [name]: value,
    });

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateForgotPasswordField(
        key,
        formData[key],
        formData
      );
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) return;

    dispatch(
      forgotPasswordUser({
        email: formData.email,
        newPassword: formData.newPassword,
      })
    );
  };

  // Watch for success/error
  useEffect(() => {
    if (success) {
      toast.success("Password updated successfully!");
      setFormData({ email: "", newPassword: "", confirmPassword: "" });
    }

    if (error) toast.error(error);
  }, [success, error]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Forgot Password
        </h2>

        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 focus:ring-2 outline-none ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 focus:ring-2 outline-none ${
                errors.newPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 focus:ring-2 outline-none ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
