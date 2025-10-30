// -------------------- IMPORTS --------------------
import React, { useState } from "react";                     // React and useState hook for state management
import { useDispatch } from "react-redux";                  // Dispatch actions to Redux store
import { useNavigate } from "react-router-dom";             // Hook for navigation after signup

import { login } from "../Redux/slice/authSlice";           // Redux login action
import api from "../Redux/slice/apiSlice";                  // API helper for HTTP requests
import { MEMBERS_URL, LOGIN_URL } from "../common/constants"; // API endpoints
import Loader from "../components/Loader";                  // Loader component to indicate loading

// -------------------- COMPONENT DEFINITION --------------------
/**
 * SignupScreen Component
 * Allows a new user to register and automatically logs them in.
 * Provides form fields for name, email, password, and role.
 */
const SignupScreen = () => {
  // Form state for user input
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "developer", // default role
  });

  // Loading state for UI feedback
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();  // Redux dispatcher
  const navigate = useNavigate();  // Navigation hook

  // -------------------- HANDLE SIGNUP --------------------
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Show loader

    try {
      // 1. Create new member
      await api.post(MEMBERS_URL, form);

      // 2. Immediately log in the newly created user
      const loginRes = await api.post(LOGIN_URL, {
        email: form.email,
        password: form.password,
      });

      // 3. Dispatch login action to Redux store
      dispatch(login(loginRes.data));

      // 4. Navigate to home page
      navigate("/");
    } catch (err) {
      // Show error alert
      alert(err.response?.data?.message || "❌ Signup failed");
    } finally {
      // Stop loader
      setIsLoading(false);
    }
  };

  // -------------------- RENDER --------------------
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg col-md-6">

        {/* Card Header */}
        <div className="card-header bg-success text-white text-center">
          <h3 className="mb-0">📝 Sign Up</h3>
        </div>

        {/* Card Body */}
        <div className="card-body p-4">

          {/* Loader for async operations */}
          {isLoading && <Loader />}

          {/* Signup Form */}
          <form onSubmit={handleSignup}>

            {/* Name Input */}
            <div className="mb-3">
              <label className="form-label fw-bold">👤 Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label className="form-label fw-bold">📧 Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label className="form-label fw-bold">🔑 Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {/* Role Selection */}
            <div className="mb-3">
              <label className="form-label fw-bold">🏷️ Role</label>
              <select
                className="form-select"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                required
              >
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
                <option value="tester">Tester</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="d-grid gap-2">
              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-outline-success btn-lg shadow-sm"
                disabled={isLoading} // Disable while loading
              >
                ✅ {isLoading ? "Signing up..." : "Sign Up"}
              </button>

              {/* Navigate back to home */}
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg"
                onClick={() => navigate("/")}
              >
                ⬅️ Back to Home 🏠
              </button>

              {/* Navigate to login */}
              <button
                type="button"
                className="btn btn-outline-primary btn-lg"
                onClick={() => navigate("/login")}
              >
                🔐 Go to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// -------------------- EXPORT --------------------
export default SignupScreen;
