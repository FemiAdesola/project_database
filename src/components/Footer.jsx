// -------------------- IMPORTS --------------------
import React from "react"; // Import React library
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Import FontAwesome icons for social links

import qrCode from "../assets/Femi_Oyinloye_Portfolio_QR.png"; // Home page banner image

// -------------------- COMPONENT DEFINITION --------------------
/**
 * Footer Component
 * Displays the app footer with copyright info, tech stack, and social media links.
 */
const Footer = () => {
  return (
    // Footer container with dark background, light text, centered content, padding, and margin-top auto for spacing
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <div className="container">
        {/* Copyright text */}
        <p className="mb-1">
          Femi Adesola &copy; {new Date().getFullYear()} Project Database App.
        </p>

        {/* Small text showing the tech stack */}
        <small>Built with React Redux & Bootstrap</small>

        {/* Social media icons section */}
        <div className="mt-2">
          {/* LinkedIn link */}
          <a
            href="https://www.linkedin.com/in/femi-adesola-oyinloye-106454145/"
            target="_blank" // Opens link in a new tab
            rel="noopener noreferrer" // Security best practice for external links
            className="text-light ms-2" // Bootstrap text color and margin start
          >
            <FaLinkedin size={24} /> {/* LinkedIn icon */}
          </a>

          {/* GitHub link */}
          <a
            href="https://github.com/FemiAdesola"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light ms-2"
          >
            <FaGithub size={24} /> {/* GitHub icon */}
          </a>
        </div>
        <p>Scan to view my portfolio</p>
        <img src={qrCode} alt="qrcode" />
      </div>
    </footer>
  );
};

// -------------------- EXPORT --------------------
// Export the Footer component so it can be imported and used in other parts of the app
export default Footer;
