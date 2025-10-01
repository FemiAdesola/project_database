import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../Redux/slice/apiSlice.jsx";
import { MEMBERS_URL } from "../../common/constants";
import BackToHome from "../../components/BackToHome";
import CancelButton from "../../components/CancelButton";

const UpdateMember = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", email: "", role: "developer" });
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`${MEMBERS_URL}/${id}`)
      .then((res) => setForm(res.data.data))
      .catch(() => alert("❌ Error fetching member"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`${MEMBERS_URL}/${id}`, form);
      navigate("/members");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Error updating member");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg col-md-6">
        <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
          <h3 className="mb-0">✏️ Update Member</h3>
          <div className="d-flex gap-2">
            <BackToHome />
            <CancelButton to="/members" />
          </div>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">👤 Name</label>
              <input
                className="form-control"
                placeholder="Enter member name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">📧 Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="Enter member email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

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

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-outline-primary btn-lg shadow-sm">
                ✅ Update Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMember;
