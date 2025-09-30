import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Redux/slice/apiSlice";
import { GETMEMBERS_URL } from "../../common/constants";


import { FaEdit, FaTrash } from "react-icons/fa";

export default function MembersList() {
  const [members, setMembers] = useState([]);

  const loadMembers = async () => {
    try {
      const res = await api.get(GETMEMBERS_URL);
      setMembers(res.data.data || []);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    try {
      await api.delete(`/${id}`);
      setMembers(members.filter((m) => m._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting member");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Members</h2>
        <Link to="/members/create" className="btn btn-primary">
          + Create Member
        </Link>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.role}</td>
              <td>
                <Link
                  to={`/members/${m._id}/edit`}
                  className="btn btn-sm btn-warning me-2"
                >
                  <FaEdit />
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteMember(m._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {members.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No members found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
