import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import api from "../../Redux/slice/apiSlice";
import { GETPROJECTS_URL } from "../../common/constants";

const ProjectsList = () =>{
  const [projects, setProjects] = useState([]);

  // Load projects
  const loadProjects = async () => {
    try {
      const res = await api.get(GETPROJECTS_URL);
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
    if (!window.confirm("Delete this project?")) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting project");
    }
  };

  // Render
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Projects</h2>
        <Link to="/projects/create" className="btn btn-primary">
          + Create New Project
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Start</th>
              <th>End</th>
              <th>Members</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id}>
                <td>{p.projectId}</td>
                <td>{p.title}</td>
                <td>{p.description}</td>
                <td>{p.status}</td>
                <td>{p.startDate ? new Date(p.startDate).toLocaleDateString() : "-"}</td>
                <td>{p.endDate ? new Date(p.endDate).toLocaleDateString() : "-"}</td>
                <td>{p.members?.map((m) => m.name).join(", ") || "None"}</td>
                <td>
                  <Link to={`/projects/${p._id}/edit`} className="btn btn-sm btn-warning me-2">
                    <FaEdit />
                  </Link>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteProject(p._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">No projects found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsList;