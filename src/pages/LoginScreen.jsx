import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; 

import {login} from '../Redux/slice/authSlice';
import api from '../Redux/slice/apiSlice';
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
      navigate("/projects");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg col-md-6">
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-4">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary w-100">Login</button>
          </form>
          <div className="text-center mt-3 d-flex justify-content-center gap-2">
            <button
              className="btn btn-dark btn-sm"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={() => navigate("/signup")}
            >
              Go to Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen;