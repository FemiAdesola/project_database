import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../Redux/slice/authSlice";
import api from "../Redux/slice/apiSlice";
import { LOGIN_URL } from "../common/constants";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(LOGIN_URL, { email, password });
      dispatch(login(res.data));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg col-md-6">
        <div className="card-header bg-primary text-white text-center">
          <h3 className="mb-0">🔐 Login</h3>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-bold">📧 Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">🔑 Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-outline-primary btn-lg shadow-sm">
                ✅ Login
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
                className="btn btn-outline-success btn-lg"
                onClick={() => navigate("/signup")}
              >
                📝 Go to Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
