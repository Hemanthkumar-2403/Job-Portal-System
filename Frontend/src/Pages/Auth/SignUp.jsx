import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { validateSignupField } from "./Validation";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux states
  const { loading, error, success, user } = useSelector((state) => state.auth);

  // Form state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

 
  // 🚫 If already logged in → redirect
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

    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const errorMsg = validateSignupField(name, value, {
      ...signupData,
      [name]: value,
    });

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Submit
  const handleSignupClick = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(signupData).forEach((key) => {
      const msg = validateSignupField(key, signupData[key], signupData);
      newErrors[key] = msg;
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((msg) => msg !== "")) return;

    dispatch(signupUser(signupData));
  };

  // Handle success/error
  useEffect(() => {
    if (success) {
      toast.success("Signup successful! Please login.");
      navigate("/signin");
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Join thousands of professionals finding their dream jobs
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            value={signupData.name}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-pink-400"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-pink-400"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Password *</label>
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-pink-400"
            }`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            value={signupData.confirmPassword}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.confirmPassword ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-pink-400"
            }`}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Select Role *</label>
          <select
            name="role"
            value={signupData.role}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.role ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-pink-400"
            }`}
          >
            <option value="">Choose your role</option>
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        {/* Submit */}
        <button
          onClick={handleSignupClick}
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold mb-4 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Sign In link */}
        <p className="text-center text-gray-700">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
