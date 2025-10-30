// -------------------- IMPORTS --------------------
import React from "react";
import { Routes, Route } from "react-router-dom"; // Routing components from react-router-dom

// Importing layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Importing pages/screens
import Home from "./pages/HomeScreen";
import MembersList from "./pages/Member/MemberList";
import ProjectsList from "./pages/Project/ProjectsList";
import LoginScreen from "./pages/LoginScreen";
import SignupScreen from "./pages/SignupScreen";
import CreateProject from "./pages/Project/CreateProject";
import UpdateProject from "./pages/Project/UpdateProject";
// import CreateMember from "./pages/Member/CreateMember"; // Currently commented out
import UpdateMember from "./pages/Member/UpdateMember";

// -------------------- APP COMPONENT --------------------
function App() {
  return (
    <>
      {/* Wrapper div to ensure footer stays at bottom */}
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar at the top */}
        <Navbar />

        {/* Main content grows to fill space between navbar and footer */}
        <div className="flex-grow-1">
          <Routes>
            {/* -------------------- PUBLIC ROUTES -------------------- */}
            <Route path="/" element={<Home />} />                 {/* Home page */}
            <Route path="/login" element={<LoginScreen />} />    {/* Login page */}
            <Route path="/signup" element={<SignupScreen />} />  {/* Signup page */}

            {/* -------------------- MEMBERS ROUTES -------------------- */}
            <Route path="/members" element={<MembersList />} />  {/* List all members */}
            {/* <Route path="/members/create" element={<CreateMember />} /> */} 
            <Route path="/members/:id/edit" element={<UpdateMember />} />  {/* Update member info */}

            {/* -------------------- PROJECTS ROUTES -------------------- */}
            <Route path="/projects" element={<ProjectsList />} />          {/* List all projects */}
            <Route path="/projects/create" element={<CreateProject />} />  {/* Create a new project */}
            <Route path="/projects/:id/edit" element={<UpdateProject />} /> {/* Update project info */}
          </Routes>
        </div>

        {/* Footer always at the bottom */}
        <Footer />
      </div>
    </>
  );
}

// -------------------- EXPORT --------------------
export default App;
