import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";

import api from "../../Redux/slice/apiSlice";
import { PROJECTS_URL } from "../../common/constants";
import BackToHome from "../../components/BackToHome";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const { member } = useSelector((state) => state.auth);

  // Load projects
  const loadProjects = async () => {
    try {
      const res = await api.get(PROJECTS_URL);
      setProjects(res.data.data || []);
    } catch (err) {
      console.error("Error loading projects:", err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Delete project
  const deleteProject = async (id) => {
    if (!window.confirm("❌ Delete this project?")) return;
    try {
      await api.delete(`${PROJECTS_URL}/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting project");
    }
  };

  return (
    <div className="container mt-4">
      {/* Header Card */}
      <div className="card shadow-lg mb-4">
        <div className="card-header bg-dark text-light d-flex justify-content-between align-items-center p-3">
          <h3 className="mb-0">📂 Projects</h3>
          <div className="d-flex gap-2">
            <BackToHome />
            {member?.role === "admin" && (
              <Link to="/projects/create" className="btn btn-light btn-sm shadow-sm">
                ➕ New Project
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="row">
        {projects.length > 0 ? (
          projects.map((p) => (
            <div key={p._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{p.title}</h5>
                  <p className="text-muted">{p.description}</p>
                  <ul className="list-unstyled mb-3">
                    <li><strong>ID:</strong> {p.projectId}</li>
                    <li><strong>Status:</strong> 
                      <span className={`badge ms-1 ${p.status === "completed" ? "bg-success" : p.status === "in-progress" ? "bg-warning text-dark" : "bg-secondary"}`}>
                        {p.status}
                      </span>
                    </li>
                    <li><strong>Start:</strong> {p.startDate ? new Date(p.startDate).toLocaleDateString() : "-"}</li>
                    <li><strong>End:</strong> {p.endDate ? new Date(p.endDate).toLocaleDateString() : "-"}</li>
                    <li><strong>Members:</strong> {p.members?.map((m) => m.name).join(", ") || "None"}</li>
                  </ul>
                </div>

                {member?.role === "admin" && (
                  <div className="card-footer d-flex justify-content-center gap-2">
                    <Link to={`/projects/${p._id}/edit`} className="btn btn-sm btn-warning">
                      <FaEdit />
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteProject(p._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center">
              No projects found
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
