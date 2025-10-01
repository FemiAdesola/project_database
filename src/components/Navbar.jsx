import React from "react";
import { Link, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../Redux/slice/authSlice";
import logo from "../assets/logo.png";

const Navbar = () =>  {
  const { member } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5" style={{ height: "80px" }}>
      {/* Brand with Logo */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img 
          src={logo} 
          alt="Logo" 
          style={{ height: "40px", marginRight: "10px" }} 
        />
        Project Database App
      </Link>
        {/* Toggler button for mobile */}
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
      <div className="collapse navbar-collapse bg-dark" id="navbarContent">
          <ul className="navbar-nav ms-auto text-center">
            {member && (
              <li className="nav-item mb-2 my-2">
                <span className="text-white">
                  Hello, {member.name}!
                </span>
              </li>
            )}
              {member ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/members">Members</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/projects">Projects</Link>
                  </li>
                  {member.role === "admin" && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin">Admin Panel</Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-light ms-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
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
}

export default Navbar;
