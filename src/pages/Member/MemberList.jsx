// -------------------- IMPORTS --------------------
import React, { useEffect, useState } from "react"; // React hooks for state and lifecycle
import { Link } from "react-router-dom";           // Link for navigation
import { useSelector } from "react-redux";        // Access Redux state

import api from "../../Redux/slice/apiSlice";     // Custom API helper
import { MEMBERS_URL } from "../../common/constants"; // API endpoint for members
import BackToHome from "../../components/BackToHome"; // Reusable button to go home

import { FaEdit, FaTrash } from "react-icons/fa"; // Icons for edit and delete actions

// -------------------- COMPONENT DEFINITION --------------------
/**
 * MembersList Component
 * Displays a table of all members. Admins have additional options to edit or delete members.
 */
const MembersList = () => {
  // State to store fetched members
  const [members, setMembers] = useState([]);

  // Get the logged-in member from Redux to check role for permissions
  const { member } = useSelector((state) => state.auth);

  // -------------------- FETCH MEMBERS --------------------
  const loadMembers = async () => {
    try {
      const res = await api.get(MEMBERS_URL); // GET request to fetch members
      setMembers(res.data.data || []);       // Update state with fetched members
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  // Fetch members when component mounts
  useEffect(() => {
    loadMembers();
  }, []);

  // -------------------- DELETE MEMBER --------------------
  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return; // Confirm deletion
    try {
      await api.delete(`${MEMBERS_URL}/${id}`);         // DELETE request to API
      setMembers(members.filter((m) => m._id !== id));  // Remove deleted member from state
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting member");
    }
  };

  // -------------------- RENDER --------------------
  return (
    <div className="container mt-4">

      {/* Card Header with Title and Navigation */}
      <div className="card-header bg-dark-subtle text-light d-flex w-100 justify-content-between align-items-center p-3">
        <h3 className="mb-0">👥 Members</h3>
        <div className="d-flex gap-2">
          <BackToHome /> {/* Button to navigate back to homepage */}
        </div>
      </div>

      {/* Members Table */}
      <table className="table table-striped table-bordered">
        <thead className="table-info">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            {member?.role === "admin" && <th>Actions</th>} {/* Only show actions for admin */}
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.role}</td>

              {/* Admin-only actions: Edit and Delete */}
              {member?.role === "admin" && (
                <td>
                  {/* Edit button navigates to edit page */}
                  <Link
                    to={`/members/${m._id}/edit`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    <FaEdit />
                  </Link>
                  {/* Delete button triggers deletion */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteMember(m._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              )}
            </tr>
          ))}

          {/* Display message if no members are found */}
          {members.length === 0 && (
            <tr>
              <td colSpan={member?.role === "admin" ? 4 : 3} className="text-center">
                No members found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// -------------------- EXPORT --------------------
export default MembersList; // Export component for use in the app
