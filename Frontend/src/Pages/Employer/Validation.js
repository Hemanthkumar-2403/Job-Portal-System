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

  // ❌ REMOVE validation for companyLogo & profilePic here

  return error;
};
