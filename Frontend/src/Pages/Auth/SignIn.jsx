import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { validateSigninField } from "./Validation";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../../redux/authSlice";
import { toast } from "react-toastify";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ------ ALL HOOKS MUST BE HERE ------
  const { loading, error, user } = useSelector((state) => state.auth);
  const [signinData, setSigninData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  // ------------------------------------

  // ❌ REMOVE REDIRECTS INSIDE useEffect
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  
if (user) {
  if (user.role === "employer") {
    // ⭐ If profile not completed → send to form
    if (!user.profileCompleted) {
      return <Navigate to="/employer/profile" replace />;
    }
    return <Navigate to="/employer-dashboard" replace />;
  }

  if (user.role === "jobseeker") {
    if (!user.profileCompleted) {
      return <Navigate to="/jobseeker/profile" replace />;
    }
    return <Navigate to="/find-jobs" replace />;
  }
}



  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninData((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateSigninField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSigninClick = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(signinData).forEach((key) => {
      newErrors[key] = validateSigninField(key, signinData[key]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e)) return;

    dispatch(signinUser(signinData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">

        <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">Welcome Back</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">Sign in to your JobPortal account</p>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={signinData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={signinData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <p
          onClick={() => navigate("/forgot-password")}
          className="text-center text-blue-500 text-sm mb-5 cursor-pointer hover:underline"
        >
          Forgot Password?
        </p>

        <button
          onClick={handleSigninClick}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold shadow-md disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center text-sm mt-5 text-gray-700">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer hover:underline font-medium"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signin;
