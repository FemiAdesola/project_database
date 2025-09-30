import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 

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
      alert("Login successful");
      navigate("/projects");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
   <div className="container mt-5 col-md-6">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  )
}

export default LoginScreen;