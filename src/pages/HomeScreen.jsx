// -------------------- IMPORTS --------------------
import React from "react";                      // React library
import { useSelector } from "react-redux";     // Hook to access Redux store
import { Link } from "react-router-dom";       // Link for client-side navigation

import homeBanner from "../assets/Proj.png";   // Home page banner image

// -------------------- COMPONENT DEFINITION --------------------
/**
 * Home Component
 * Displays a welcome page with conditional content based on user login status.
 */
const Home = () => {
  // Access the logged-in member from Redux state
  const { member } = useSelector((state) => state.auth);

  // -------------------- RENDER --------------------
  return (
    <div className="container text-center mt-5">

      {/* Page Title */}
      <h1>Welcome to Project Database App</h1>

      {/* Conditional content based on login status */}
      {member ? (
        // If member is logged in
        <>
          <p className="lead">
            Hello, {member.name}! Manage your projects and team here.
          </p>
          {/* Links for logged-in users */}
          <Link to="/projects" className="btn btn-primary me-2">
            View Projects
          </Link>
          <Link to="/members" className="btn btn-secondary">
            View Members
          </Link>
        </>
      ) : (
        // If no member is logged in
        <>
          <p className="lead">
            Browse available members, or login to manage projects.
          </p>
          {/* Links for visitors */}
          <Link to="/login" className="btn btn-primary me-2">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success">
            Signup
          </Link>
        </>
      )}

      {/* Banner image */}
      <div className="mt-4">
        <img
          src={homeBanner}
          alt="Project Database Banner"
          className="img-fluid rounded shadow"
          style={{ maxHeight: "400px" }} // Limit banner height
        />
      </div>
      
    </div>
  );
};

// -------------------- EXPORT --------------------
export default Home; // Export component for use in the app
