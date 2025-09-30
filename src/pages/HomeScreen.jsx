import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Project Database App</h1>
          <p className="lead">Hello, Ade! Manage your projects and team here.</p>
          <Link to="/projects" className="btn btn-primary me-2">View Projects</Link>
          <Link to="/members" className="btn btn-secondary">View Members</Link>
          <p className="lead">Please login or sign up to get started.</p>
          <Link to="/login" className="btn btn-primary me-2">Login</Link>
          <Link to="/signup" className="btn btn-success">Signup</Link>
    </div>
  );
}

export default Home;