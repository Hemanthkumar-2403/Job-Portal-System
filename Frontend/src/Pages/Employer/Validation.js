// ------------------- Employer Profile Validation -------------------
export const validateEmployerField = (name, value, data) => {
  let error = "";

  if (name === "companyName") {
    if (!value.trim()) error = "Company name is required";
  }

  if (name === "companyDescription") {
    if (!value.trim()) error = "Company description is required";
    else if (value.length < 20)
      error = "Description must be at least 20 characters";
  }

  if (name === "companyLogo") {
    if (!value) error = "Company logo is required";
  }

  if (name === "profilePic") {
    if (!value) error = "Profile picture is required";
  }

  return error;
};


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

  if (name === "resume") {
    if (!value) error = "Resume file is required";
  }

  return error;
};
