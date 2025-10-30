// -------------------- IMPORTS --------------------
import React, { useState } from "react";               // React library and useState hook for managing form state
import { useNavigate } from "react-router-dom";       // Hook for programmatic navigation between routes

import api from "../../Redux/slice/apiSlice";        // Custom API helper for making HTTP requests
import { MEMBERS_URL } from "../../common/constants"; // API endpoint for members
import BackToHome from "../../components/BackToHome"; // Reusable button to navigate to homepage
import CancelButton from "../../components/CancelButton"; // Reusable cancel button

// -------------------- COMPONENT DEFINITION --------------------
/**
 * CreateMember Component
 * A form to add a new member to the project database.
 */
const CreateMember = () => {
  // -------------------- STATE --------------------
  // Form state to track user inputs
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "developer", // Default role
  });

  // Hook for navigation after successful member creation
  const navigate = useNavigate();

  // -------------------- FORM SUBMISSION HANDLER --------------------
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    try {
      // Send POST request to create new member
      await api.post(MEMBERS_URL, form);

      // Notify user of success
      alert("✅ Member created successfully!");

      // Redirect to the members listing page
      navigate("/members");
    } catch (err) {
      // Show error message if API request fails
      alert(err.response?.data?.message || "❌ Error creating member");
    }
  };

  // -------------------- RENDER --------------------
  return (
    <div className="container mt-5 col-md-8 col-lg-6">
      <div className="card shadow">

        {/* Card Header with Title and Navigation Buttons */}
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">➕ Create Member</h3>
          <div className="d-flex gap-2">
            <BackToHome />                 {/* Button to go back to homepage */}
            <CancelButton to="/members" /> {/* Button to cancel and return to members page */}
          </div>
        </div>

        {/* Card Body containing the Form */}
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            
            {/* Name Input */}
            <div className="mb-3">
              <label className="form-label fw-bold">👤 Name</label>
              <input
                className="form-control"
                placeholder="Enter member's name"
                value={form.name}                        // Controlled input value
                onChange={(e) => setForm({ ...form, name: e.target.value })} // Update form state
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label className="form-label fw-bold">📧 Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter member's email"
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
                placeholder="Enter password"
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
              >
                <option value="admin">Admin</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
                <option value="tester">Tester</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-success btn-lg shadow-sm">
                ✅ Create Member
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

// -------------------- EXPORT --------------------
export default CreateMember; // Export component for use in the app
