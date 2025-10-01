import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";


import api from "../../Redux/slice/apiSlice";
import { PROJECTS_URL } from "../../common/constants";
import BackToHome from "../../components/BackToHome";

const ProjectsList = () =>{
  const [projects, setProjects] = useState([]);
  const { member } = useSelector((state) => state.auth); // For getting logged-in member

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
    if (!window.confirm("Delete this project?")) return;
    try {
      await api.delete(`${PROJECTS_URL}/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting project");
    }
  };

  // Render
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <BackToHome />
        <h2>Projects</h2>
        {member?.role === "admin" && (
        <Link to="/projects/create" className="btn btn-primary">
         Create New Project
        </Link>
          )}
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
              {member?.role === "admin" && <th>Actions</th>}
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
                {member?.role === "admin" && (
                <td>
                  <Link to={`/projects/${p._id}/edit`} className="btn btn-sm btn-warning me-2">
                    <FaEdit />
                  </Link>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteProject(p._id)}>
                    <FaTrash />
                  </button>
                </td>
                 )}
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={member?.role === "admin" ? 8 : 7} className="text-center">No projects found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsList;