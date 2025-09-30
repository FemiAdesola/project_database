import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import api from "../../Redux/slice/apiSlice";
import { CREATEMPROJECTS_URL, GETMEMBERS_URL } from "../../common/constants";
import BackToHome from "../../components/BackToHome";

const CreateProject = () => {
  const { member } = useSelector((state) => state.auth); // For getting logged-in member
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

  // For Redirecting non-admins
  useEffect(() => {
    if (!member || member.role !== "admin") {
      navigate("/"); // redirect to homepage if not admin
    }
  }, [member, navigate]);

  // for loading members
  useEffect(() => {
    api.get(GETMEMBERS_URL)
      .then((res) => setMembersList(res.data.data || []))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
      await api.post(CREATEMPROJECTS_URL, form);
      navigate("/projects");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating project");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Create New Project</h3>
         <BackToHome />
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

            <button type="submit" className="btn btn-success w-100">
              Create Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
