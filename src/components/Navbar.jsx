// -------------------- IMPORTS --------------------
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation and linking between pages
import { useSelector, useDispatch } from "react-redux"; // For accessing and updating Redux state
import { logout } from "../Redux/slice/authSlice"; // Redux action for logging out
import logo from "../assets/logo.png"; // Logo image used in the navbar

// -------------------- NAVBAR COMPONENT --------------------
const Navbar = () => {
  // Access the current logged-in user (member) from Redux state
  const { member } = useSelector((state) => state.auth);

  // Create dispatch function for triggering Redux actions
  const dispatch = useDispatch();

  // Hook for programmatic navigation (redirects)
  const navigate = useNavigate();

  /**
   * Handles logout:
   * - Dispatches the logout action to clear user data
   * - Redirects the user to the homepage
   */
  const handleLogout = () => {
    dispatch(logout()); // Remove user authentication data from Redux
    navigate("/");      // Redirect to home page
  };

  return (
    // Bootstrap Navbar container
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5" style={{ height: "80px" }}>
      
      {/* -------------------- BRAND SECTION -------------------- */}
      {/* Displays the app logo and name; links back to the homepage */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img 
          src={logo} 
          alt="Logo" 
          style={{ height: "40px", marginRight: "10px" }} 
        />
        Project Database App
      </Link>

      {/* -------------------- MOBILE TOGGLER -------------------- */}
      {/* Hamburger menu for smaller screens */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* -------------------- NAVIGATION LINKS -------------------- */}
      <div className="collapse navbar-collapse bg-dark" id="navbarContent">
        <ul className="navbar-nav ms-auto text-center">
          
          {/* If a user (member) is logged in, show their greeting */}
          {member && (
            <li className="nav-item mb-2 my-2">
              <span className="text-white">
                Hello, {member.name}!
              </span>
            </li>
          )}

          {/* Conditional Rendering: Logged-in vs Logged-out state */}
          {member ? (
            // If logged in: show project links and logout button
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/members">Members</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/projects">Projects</Link>
              </li>

              {/* Optional admin link (currently commented out)
              {member.role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin Panel</Link>
                </li>
              )} */}

              {/* Logout button */}
              <li className="nav-item">
                <button
                  className="btn btn-outline-info ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            // If not logged in: show login and signup links
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

// -------------------- EXPORT COMPONENT --------------------
export default Navbar; // Makes Navbar available for import in other components
