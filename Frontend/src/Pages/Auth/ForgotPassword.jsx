import { useState } from "react";
import axios from "axios";
import { validateForgotPasswordField } from "./Validation"; // import validation

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // ----------------- Handle Change -----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    const errorMsg = validateForgotPasswordField(name, value, {
      ...formData,
      [name]: value,
    });
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  // ----------------- Handle Submit -----------------
  const handleSubmit = async () => {
    // Run validation for all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateForgotPasswordField(key, formData[key], formData);
    });
    setErrors(newErrors);

    // Check if any error exists
    if (Object.values(newErrors).some(e => e)) return;

    try {
      const res = await axios.patch(
        "http://localhost:4000/api/auth/forgot_password",
        {
          email: formData.email,
          newPassword: formData.newPassword,
        }
      );
      setMessage(res.data.message);
      setFormData({ email: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      setMessage("Error updating password. Try again.");
    }
  };

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
                errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                errors.newPassword ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 focus:ring-2 outline-none ${
                errors.confirmPassword ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Message */}
          {message && (
            <p
              className={`text-center text-sm ${
                message.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
