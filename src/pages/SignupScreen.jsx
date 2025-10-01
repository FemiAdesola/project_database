import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../Redux/slice/authSlice";
import api from "../Redux/slice/apiSlice";
import { MEMBERS_URL, LOGIN_URL } from "../common/constants";
import Loader from "../components/Loader";

const SignupScreen = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "developer",
  });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post(MEMBERS_URL, form);

      // immediately login after signup
      const loginRes = await api.post(LOGIN_URL, {
        email: form.email,
        password: form.password,
      });

      dispatch(login(loginRes.data));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg col-md-6">
        <div className="card-header bg-success text-white text-center">
          <h3 className="mb-0">📝 Sign Up</h3>
        </div>
        <div className="card-body p-4">
          {isLoading && <Loader />}
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label fw-bold">👤 Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
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
                placeholder="Enter your email"
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
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">🏷️ Role</label>
              <select
                className="form-select"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                required
              >
                <option value="admin">Admin</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
                <option value="tester">Tester</option>
              </select>
            </div>

            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-outline-success btn-lg shadow-sm"
                disabled={isLoading}
              >
                ✅ {isLoading ? "Signing up..." : "Sign Up"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg"
                onClick={() => navigate("/")}
              >
                ⬅️ Back to Home 🏠
              </button>
              <button
                type="button"
                className="btn btn-outline-primary btn-lg"
                onClick={() => navigate("/login")}
              >
                🔐 Go to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
