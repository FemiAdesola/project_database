// -------------------- IMPORTS --------------------
import React, { useState } from "react";                     // React hooks for state management
import { useDispatch } from "react-redux";                  // Dispatch actions to Redux store
import { useNavigate } from "react-router-dom";             // Navigation hook for routing

import { login } from "../Redux/slice/authSlice";           // Redux action to update auth state
import api from "../Redux/slice/apiSlice";                  // API helper for HTTP requests
import { LOGIN_URL } from "../common/constants";            // API endpoint for login

// -------------------- COMPONENT DEFINITION --------------------
/**
 * LoginScreen Component
 * Displays a login form for users to enter email and password.
 * On successful login, updates Redux state and redirects to home page.
 */
const LoginScreen = () => {
  // State for email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux dispatch function
  const dispatch = useDispatch();

  // Hook for navigation after login
  const navigate = useNavigate();

  // -------------------- HANDLE LOGIN --------------------
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    try {
      // POST request to login endpoint with email and password
      const res = await api.post(LOGIN_URL, { email, password });

      // Dispatch login action to store user info in Redux
      dispatch(login(res.data));

      // Redirect to home page on successful login
      navigate("/");
    } catch (err) {
      // Display error message if login fails
      alert(err.response?.data?.message || "❌ Login failed");
    }
  };

  // -------------------- RENDER --------------------
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg col-md-6">

        {/* Card Header */}
        <div className="card-header bg-primary text-white text-center">
          <h3 className="mb-0">🔐 Login</h3>
        </div>

        {/* Card Body */}
        <div className="card-body p-4">
          <form onSubmit={handleLogin}>

            {/* Email Input */}
            <div className="mb-3">
              <label className="form-label fw-bold">📧 Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label className="form-label fw-bold">🔑 Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Buttons */}
            <div className="d-grid gap-2">
              {/* Submit button */}
              <button type="submit" className="btn btn-outline-primary btn-lg shadow-sm">
                ✅ Login
              </button>

              {/* Navigate back to home */}
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg"
                onClick={() => navigate("/")}
              >
                ⬅️ Back to Home 🏠
              </button>

              {/* Navigate to signup page */}
              <button
                type="button"
                className="btn btn-outline-success btn-lg"
                onClick={() => navigate("/signup")}
              >
                📝 Go to Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// -------------------- EXPORT --------------------
export default LoginScreen; // Export component for use in app
