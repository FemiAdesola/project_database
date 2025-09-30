import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../Redux/slice/authSlice";
import api from "../Redux/slice/apiSlice";
import { SIGNUP_URL, LOGIN_URL } from "../common/constants";
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
    try {
      await api.post(SIGNUP_URL, form);

      // immediately login after signup
      const loginRes = await api.post(LOGIN_URL, {
        email: form.email,
        password: form.password,
      });

      dispatch(login(loginRes.data));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg col-md-6">
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-4">Sign Up</h3>
           {isLoading && <Loader />}
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Name"
              className="form-control mb-3"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} required
            />
            <input
              type="email"
              placeholder="Email"
              className="form-control mb-3"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control mb-3"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} required
            />
            <select
              className="form-control mb-3"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })} required
            >
              <option value="admin">Admin</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
              <option value="tester">Tester</option>
            </select>
            <button className="btn btn-success w-100">Sign Up</button>
          </form>
           <div className="text-center mt-3 d-flex justify-content-center gap-2">
            <button
              className="btn btn-dark btn-sm"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupScreen


