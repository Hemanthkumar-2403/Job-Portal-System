// ------------------- Jobseeker Profile Validation -------------------
export const validateJobseekerField = (name, value, data) => {
  let error = "";

  if (name === "education") {
    if (!value.trim()) error = "Education is required";
  }

  if (name === "graduationYear") {
    if (!value.trim()) error = "Graduation year is required";
    else if (!/^[0-9]{4}$/.test(value))
      error = "Enter a valid year (Example: 2023)";
  }

  if (name === "experience") {
    if (!value.trim()) error = "Experience is required";
  }

  if (name === "skills") {
    if (!value.trim()) error = "Skills are required";
  }

  // ❌ REMOVE this (file validation must not be here)
  // if (name === "resume") {
  //   if (!value) error = "Resume file is required";
  // }


  if (name === "phone") {
  if (!value.trim()) return "Phone number is required";
  if (!/^[0-9]{10}$/.test(value)) return "Phone must be 10 digits";
  return "";
}


  return error;
};
