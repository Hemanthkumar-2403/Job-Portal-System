// ------------------- SignUp Validation -------------------
export const validateSignupField = (name, value, signupData) => {
  let error = "";

  if (name === "name") {
    if (!value) error = "Name is required";
  }

  if (name === "email") {
    if (!value) error = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
  }

  if (name === "password") {
    if (!value) error = "Password is required";
    else if (value.length < 6)
      error = "Password must be at least 6 characters long"; // ✅ added this line
  }

  if (name === "confirmPassword") {
    if (!value) error = "Confirm Password is required";
    else if (value !== signupData.password) error = "Passwords do not match";
  }

  return error;
};

// ------------------- SignIn Validation -------------------
export const validateSigninField = (name, value) => {
  let error = "";

  if (name === "email") {
    if (!value) error = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
  }

  if (name === "password") {
    if (!value) error = "Password is required";
  }

  return error;
};


// ------------------- Forgot Password Validation -------------------
export const validateForgotPasswordField = (name, value, forgotData) => {
  let error = "";

  if (name === "email") {
    if (!value) error = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
  }

  if (name === "newPassword") {
    if (!value) error = "New Password is required";
    else if (value.length < 6)
      error = "New Password must be at least 6 characters long";
  }

  if (name === "confirmPassword") {
    if (!value) error = "Confirm Password is required";
    else if (value !== forgotData.newPassword) error = "Passwords do not match";
  }

  return error;
};
