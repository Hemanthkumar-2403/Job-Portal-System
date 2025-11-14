
// ✅ axiosInstance.js
// In your project backend, JWT is sent using cookies.
// So we don't attach a Bearer token manually.
// Instead, we tell axios to include cookies automatically.

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5100/api",
  withCredentials: true, // 👈 VERY IMPORTANT (this sends cookies)
});

export default axiosInstance;
