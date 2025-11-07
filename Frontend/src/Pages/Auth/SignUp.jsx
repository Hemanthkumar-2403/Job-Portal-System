import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateSignupField } from "./Validation";

function SignUp() {
  const navigate = useNavigate();

  // store user input data here
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    profilePic: null,
  });

  // store any validation error messages
  const [errors, setErrors] = useState({});

  // handle text & file input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // if profile pic → take file, else take normal value
    const fieldValue = name === "profilePic" ? files[0] : value;

    // update state
    setSignupData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // validate field (except profilePic)
    if (name !== "profilePic") {
      const errorMsg = validateSignupField(
        name,
        fieldValue,
        { ...signupData, [name]: fieldValue }
      );
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  // when user clicks sign up button
  const handleSignupClick = (e) => {
    e.preventDefault();

    const newErrors = {};
    for (let key in signupData) {
      if (key !== "profilePic") {
        const errorMsg = validateSignupField(key, signupData[key], signupData);
        newErrors[key] = errorMsg;
      }
    }
    setErrors(newErrors);

    // if any field has an error, stop here
    if (Object.values(newErrors).some((msg) => msg !== "")) return;

    alert("Signup Successful.");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Join thousands of professionals finding their dream jobs
        </p>

        {/* ==== Profile Picture Upload ==== */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">
            Profile Picture
          </label>

          {/* side by side using flex */}
          <div className="flex items-center gap-4">
            {/* Circle preview area */}
            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
              {signupData.profilePic ? (
                <img
                  src={URL.createObjectURL(signupData.profilePic)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </div>

            {/* Upload button */}
            <div className="flex flex-col">
              <label
                htmlFor="profilePic"
                className="cursor-pointer text-sm font-medium text-pink-600 hover:text-pink-700"
              >
                Upload Photo
              </label>
              <input
                id="profilePic"
                type="file"
                name="profilePic"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-1">JPG or PNG up to 5MB</p>
            </div>
          </div>
        </div>

        {/* ==== Full Name ==== */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            value={signupData.name}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-pink-400"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* ==== Email ==== */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-pink-400"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* ==== Password ==== */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Password *</label>
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-pink-400"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* ==== Confirm Password ==== */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            value={signupData.confirmPassword}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-pink-400"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* ==== Role Selection ==== */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Select Role *</label>
          <select
            name="role"
            value={signupData.role}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.role
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-pink-400"
            }`}
          >
            <option value="">Choose your role</option>
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        {/* ==== Button ==== */}
        <button
          onClick={handleSignupClick}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold mb-4"
        >
          Sign Up
        </button>

        {/* ==== Sign In link ==== */}
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