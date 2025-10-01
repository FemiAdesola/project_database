import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import homeBanner from "../assets/Proj.png";

const Home = () => {
    const { member } = useSelector((state) => state.auth);
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Project Database App</h1>
      {member ? (
        <>
          <p className="lead">Hello, {member.name}! Manage your projects and team here.</p>
          <Link to="/projects" className="btn btn-primary me-2">View Projects</Link>
          <Link to="/members" className="btn btn-secondary">View Members</Link>
           </>
      ) : (
        <>
          <p className="lead">Browse available members, or login to manage projects.</p>
          <Link to="/login" className="btn btn-primary me-2">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success">
            Signup
          </Link>
        </>
        
        )}
        <div className="mt-4">
        <img
          src={homeBanner}
          alt="Project Database Banner"
          className="img-fluid rounded shadow"
          style={{ maxHeight: "400px" }}
        />
      </div>
        
    </div>
  );
}

export default Home;