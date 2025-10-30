// -------------------- IMPORTS --------------------
import axios from "axios";  // Import axios for HTTP requests

// -------------------- CREATE AXIOS INSTANCE --------------------
/**
 * Create a custom Axios instance with a predefined base URL.
 * This allows all requests to use the same API base path.
 */
const api = axios.create({
  baseURL: "https://project-database-api.onrender.com", // Base URL for API requests
});

// -------------------- REQUEST INTERCEPTOR --------------------
/**
 * Attach Authorization header to every request if a token exists in localStorage.
 * For protecting endpoints that require a JWT token.
 */
api.interceptors.request.use((config) => {
  // Get token from local storage
  const token = localStorage.getItem("token");

  // If token exists, add it to the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Return the updated config
  return config;
});

// -------------------- EXPORT --------------------
export default api; // Export configured Axios instance for use in API calls
