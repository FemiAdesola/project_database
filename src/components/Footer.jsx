import React from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa"; 

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-1">
          Femi Adesola &copy; {new Date().getFullYear()} Project Database App.
        </p>
        <small>
          Built with React Redux & Bootstrap
        </small>
        <div className="mt-2">
            <a
            href="https://www.linkedin.com/in/femi-adesola-oyinloye-106454145/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light ms-2"
          >
            <FaLinkedin size={24} />
          </a>
            <a
            href="https://github.com/FemiAdesola" target="_blank"
            rel="noopener noreferrer"
            className="text-light ms-2"
          >
            <FaGithub size={24} />
          </a>

          
        </div>
      </div>
    </footer>
  );
}

export default Footer