import React from "react";
import { useSelector } from "react-redux";

function CompanyProfile() {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  const employer = user.employer || {};

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md p-8 rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-6">Company Profile</h2>

      {/* Company Logo */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Company Logo</label>
        <img
          src={employer.companyLogo || "/no-logo.png"}
          alt="Company Logo"
          className="h-24 w-24 rounded-md border object-cover"
        />
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
