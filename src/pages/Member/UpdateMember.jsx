// -------------------- IMPORTS --------------------
import React, { useEffect, useState } from "react";          // React hooks for state and lifecycle
import { useParams, useNavigate } from "react-router-dom";  // Hooks for route params and navigation

import api from "../../Redux/slice/apiSlice.jsx";           // Custom API helper
import { MEMBERS_URL } from "../../common/constants.jsx";   // API endpoint for members
import BackToHome from "../../components/BackToHome.jsx";   // Button to navigate to homepage
import CancelButton from "../../components/CancelButton.jsx"; // Reusable cancel button

// -------------------- COMPONENT DEFINITION --------------------
/**
 * UpdateMember Component
 * Allows admin to update the role of an existing member.
 * Name and email are displayed as read-only.
 */
const UpdateMember = () => {
  // Get member ID from route parameters
  const { id } = useParams();

  // Form state to hold member data (name, email, role)
  const [form, setForm] = useState({ name: "", email: "", role: "developer" });

  // Hook for navigation after successful update
  const navigate = useNavigate();

  // -------------------- FETCH MEMBER DATA --------------------
  useEffect(() => {
    // Fetch member info on component mount
    api
      .get(`${MEMBERS_URL}/${id}`)
      .then((res) => setForm(res.data.data)) // Populate form with fetched data
      .catch(() => alert("❌ Error fetching member")); // Show alert on error
  }, [id]);

  // -------------------- FORM SUBMISSION HANDLER --------------------
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on submit
    try {
      // Only update role; name and email are read-only
      await api.put(`${MEMBERS_URL}/${id}`, { role: form.role });
      alert("✅ Role updated successfully!"); // Notify user
      navigate("/members");                  // Redirect to members list
    } catch (err) {
      // Display error message if API request fails
      alert(err.response?.data?.message || "❌ Error updating member");
    }
  };

  // -------------------- RENDER --------------------
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg col-md-6">

        {/* Card Header with title and navigation buttons */}
        <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
          <h3 className="mb-0">✏️ Update Member</h3>
          <div className="d-flex gap-2">
            <BackToHome />               {/* Navigate to homepage */}
            <CancelButton to="/members" /> {/* Cancel and go back to members list */}
          </div>
        </div>

        {/* Card Body containing form */}
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>

            {/* Name Input (read-only) */}
            <div className="mb-3">
              <label className="form-label fw-bold">👤 Name</label>
              <input
                className="form-control"
                value={form.name}
                readOnly
              />
              <small className="text-muted">Name cannot be changed</small>
            </div>

            {/* Email Input (read-only) */}
            <div className="mb-3">
              <label className="form-label fw-bold">📧 Email</label>
              <input
                type="email"
                className="form-control"
                value={form.email}
                readOnly
              />
              <small className="text-muted">Email cannot be changed</small>
            </div>

            {/* Role Selection (editable) */}
            <div className="mb-3">
              <label className="form-label fw-bold">🛠️ Role</label>
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
              <button
                type="submit"
                className="btn btn-outline-primary btn-lg shadow-sm"
              >
                ✅ Update Role
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

// -------------------- EXPORT --------------------
export default UpdateMember; // Export component for use in app
