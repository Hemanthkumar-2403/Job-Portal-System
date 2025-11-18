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

  return error;
};
