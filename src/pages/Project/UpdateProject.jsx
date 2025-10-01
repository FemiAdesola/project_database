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

  // Restrict non-admins
  useEffect(() => {
    if (!member || member.role !== "admin") {
      navigate("/"); // redirect home
    }
  }, [member, navigate]);

  // Load project + members
  useEffect(() => {
    api.get(`${PROJECTS_URL}/${id}`).then((res) => {
      const p = res.data.data;
      setForm({
        title: p.title,
        description: p.description,
        status: p.status,
        startDate: p.startDate?.split("T")[0] || "",
        endDate: p.endDate?.split("T")[0] || "",
        members: p.members?.map((m) => m._id) || [],
      });
    });
    api
      .get(MEMBERS_URL)
      .then((res) => setMembersList(res.data.data || []))
      .catch((err) => console.error(err));
  }, [id]);

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
      alert(err.response?.data?.message || "Error updating project");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center p-4">
          <h3 className="mb-0">Update Project</h3>
          <BackToHome />
           <CancelButton to="/projects" />
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* Members as cards */}
            <div className="mb-3">
              <label className="form-label">Assign Members</label>
              <div className="row">
                {membersList.map((m) => {
                  const isSelected = form.members.includes(m._id);
                  return (
                    <div key={m._id} className="col-md-3 mb-3">
                      <div
                        className={`card p-2 text-center ${
                          isSelected ? "border-primary" : ""
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
                        <div>{m.name}</div>
                        <small className="text-muted">{m.role}</small>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="form-text">Click cards to select members.</div>
            </div>

            <button type="submit" className="btn btn-warning w-100">
              Update Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;
