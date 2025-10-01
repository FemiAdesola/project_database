import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import api from "../../Redux/slice/apiSlice";
import { MEMBERS_URL, PROJECTS_URL } from "../../common/constants";
import BackToHome from "../../components/BackToHome";
import CancelButton from "../../components/CancelButton";

const UpdateProject = () => {
  const { id } = useParams();
  const { member } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "planned",
    startDate: "",
    endDate: "",
    members: [],
  });
  const [membersList, setMembersList] = useState([]);

// Redirect non-logged-in users or non-admins
  useEffect(() => {
    if (!member) return;
    if (member.role !== "admin") navigate("/");
  }, [member, navigate]);

  // Load project and members
  useEffect(() => {
    if (!member) return;

    const fetchProject = async () => {
      try {
        const res = await api.get(`${PROJECTS_URL}/${id}`);
        const p = res.data.data;

        // Redirect if not the project creator
        if (p.createdBy._id !== member._id) {
          navigate("/projects");
          return;
        }

        setForm({
          title: p.title,
          description: p.description,
          status: p.status,
          startDate: p.startDate?.split("T")[0] || "",
          endDate: p.endDate?.split("T")[0] || "",
          members: p.members?.map((m) => m._id) || [],
        });
      } catch (err) {
        console.error("Error fetching project:", err);
        navigate("/projects");
      }
    };

    const fetchMembers = async () => {
      try {
        const res = await api.get(MEMBERS_URL);
        setMembersList(res.data.data || []);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };

    fetchProject();
    fetchMembers();
  }, [id, member, navigate]);


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
      await api.put(`${PROJECTS_URL}/${id}`, form);
      navigate("/projects");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Error updating project");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg col-md-8">
        {/* Header */}
        <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
          <h3 className="mb-0">✏️ Update Project</h3>
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
                placeholder="Update project details"
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

            {/* Submit */}
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-outline-warning btn-lg shadow-sm"
              >
                ✨ Update Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;
