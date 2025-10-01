import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import api from "../../Redux/slice/apiSlice";
import { MEMBERS_URL } from "../../common/constants";
import BackToHome from "../../components/BackToHome";


import { FaEdit, FaTrash } from "react-icons/fa";

const MembersList= ()=> {
  const [members, setMembers] = useState([]);
  const { member } = useSelector((state) => state.auth); // For getting logged-in member


  const loadMembers = async () => {
    try {
      const res = await api.get(MEMBERS_URL);
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
      await api.delete(`${MEMBERS_URL}/${id}`);
      setMembers(members.filter((m) => m._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting member");
    }
  };

  return (
    <div className="container mt-4">
      {/* <div className="d-flex justify-content-between mb-3">
        {member?.role === "admin" && (
        <Link to="/members/create" className="btn btn-primary">
          + Create Member
        </Link>
        )}
      </div> */}
         <div className="card-header bg-dark-subtle text-light d-flex w-100 justify-content-between align-items-center p-3">
          <h3 className="mb-0">👥 Members</h3>
          <div className="d-flex gap-2">
            <BackToHome/>
          </div>
        </div>

      <table className="table table-striped table-bordered">
        <thead className="table-info">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            {member?.role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.role}</td>
              {member?.role === "admin" &&(
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
          )}
            </tr>
          ))}
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
}

export default  MembersList;
