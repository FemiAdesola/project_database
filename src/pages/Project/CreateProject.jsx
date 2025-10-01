import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import api from "../../Redux/slice/apiSlice";
import { PROJECTS_URL, MEMBERS_URL } from "../../common/constants";
import BackToHome from "../../components/BackToHome";
import CancelButton from "../../components/CancelButton";

const CreateProject = () => {
  const { member } = useSelector((state) => state.auth); // logged-in member
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "planned",
    startDate: "",
    endDate: "",
    members: [],
  });
  const [membersList, setMembersList] = useState([]);
  const navigate = useNavigate();

  // Redirect non-admins
  useEffect(() => {
    if (!member || member.role !== "admin") {
      navigate("/");
    }
  }, [member, navigate]);

  // Load members
  useEffect(() => {
    api
      .get(MEMBERS_URL)
      .then((res) => setMembersList(res.data.data || []))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleMemberToggle = (id) => {
    setForm({
      ...form,
      members: form.members.includes(id)
        ? form.members.filter((mid) => mid !== id)
        : [...form.members, id],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(PROJECTS_URL, form);
      navigate("/projects");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Error creating project");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg col-md-8">
        {/* Header */}
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">🚀 Create New Project</h3>
          <div className="d-flex gap-2">
            <BackToHome />
            <CancelButton to="/projects" />
          </div>
        </div>

        {/* Body */}
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label fw-bold">📌 Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter project title"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label fw-bold">📝 Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter project details"
                required
              />
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="form-label fw-bold">📊 Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Dates */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">📅 Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">📅 End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            {/* Members */}
            <div className="mb-3">
              <label className="form-label fw-bold">👥 Assign Members</label>
              <div className="row">
                {membersList.map((m) => {
                  const isSelected = form.members.includes(m._id);
                  return (
                    <div key={m._id} className="col-md-3 mb-3">
                      <div
                        className={`card p-2 text-center shadow-sm ${
                          isSelected ? "border border-primary" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleMemberToggle(m._id)}
                      >
                        <input
                          type="checkbox"
                          className="form-check-input mb-1"
                          checked={isSelected}
                          readOnly
                        />
                        <div className="fw-bold">{m.name}</div>
                        <small className="text-muted">{m.role}</small>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="form-text">Click on cards to select members.</div>
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-outline-success btn-lg shadow-sm"
              >
                ✅ Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
