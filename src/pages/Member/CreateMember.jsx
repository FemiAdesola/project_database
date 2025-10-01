// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import api from "../../Redux/slice/apiSlice";
// import { MEMBERS_URL } from "../../common/constants";
// import BackToHome from "../../components/BackToHome";
// import CancelButton from "../../components/CancelButton";

// const CreateMember = () => {
//  const [form, setForm] = useState({ name: "", email: "", password: "", role: "developer" });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post(MEMBERS_URL, form);
//       navigate("/members");
//     } catch (err) {
//       alert(err.response?.data?.message || "Error creating member");
//     }
//   };

//   return (
//     <div className="container mt-5 col-md-6">
//       <h2>Create Member</h2>
//        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center p-4">
//           <h3 className="mb-0">Create Member</h3>
//          <BackToHome />
//           <CancelButton to="/projects" />
//         </div>
//       <form onSubmit={handleSubmit}>
//         <input className="form-control mb-2" placeholder="Name"
//           value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
//         <input className="form-control mb-2" placeholder="Email"
//           value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
//         <input className="form-control mb-2" placeholder="Password"
//           type="password"
//           value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
//         <select className="form-control mb-2"
//           value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
//           <option value="admin">Admin</option>
//           <option value="developer">Developer</option>
//           <option value="designer">Designer</option>
//           <option value="manager">Manager</option>
//           <option value="tester">Tester</option>
//         </select>
//         <button className="btn btn-success w-100">Create</button>
//       </form>
//     </div>
//   );
// }

// export default CreateMember



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../Redux/slice/apiSlice";
import { MEMBERS_URL } from "../../common/constants";
import BackToHome from "../../components/BackToHome";
import CancelButton from "../../components/CancelButton";

const CreateMember = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "developer",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(MEMBERS_URL, form);
      alert("✅ Member created successfully!");
      navigate("/members");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Error creating member");
    }
  };

  return (
    <div className="container mt-5 col-md-8 col-lg-6">
      <div className="card shadow">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">➕ Create Member</h3>
          <div className="d-flex gap-2">
            <BackToHome />
            <CancelButton to="/members" />
          </div>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">👤 Name</label>
              <input
                className="form-control"
                placeholder="Enter member's name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">📧 Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter member's email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">🔑 Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">🏷️ Role</label>
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
              <button type="submit" className="btn btn-success btn-lg shadow-sm">
                ✅ Create Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMember;
