import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateSigninField } from "./Validation";

function Signin() {
  const [signinData, setSigninData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🧠 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    const errorMsg = validateSigninField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // 🧠 Handle Signin button click
  const handleSigninClick = async () => {
    const newErrors = {};
    Object.keys(signinData).forEach((key) => {
      newErrors[key] = validateSigninField(key, signinData[key]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e)) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("✅ Sign In Successful! (demo)");
      setSigninData({ email: "", password: "" });
      navigate("/home");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        {/* 👋 Welcome Section */}
        <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Sign in to your JobPortal account
        </p>

        {/* ✉️ Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={signinData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* 🔒 Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-1 font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={signinData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* 🔗 Forgot Password */}
        <p
          onClick={() => navigate("/forgot-password")}
          className="text-center text-blue-500 text-sm mb-5 cursor-pointer hover:underline"
        >
          Forgot Password?
        </p>

        {/* 🔘 Signin Button */}
        <button
          type="button"
          onClick={handleSigninClick}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white py-2 rounded-lg font-semibold shadow-md transition"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* 👇 Signup Link */}
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
