import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/HomeScreen";
import MembersList from "./pages/Member/MemberList";
import ProjectsList from "./pages/Project/ProjectsList";
import LoginScreen from "./pages/LoginScreen";
import SignupScreen from "./pages/SignupScreen";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />

       {/* Members */}
        <Route
          path="/members"
          element={<MembersList />}
        />

        {/* Projects */}
        <Route
          path="/projects"
          element={<ProjectsList />}
        />
      </Routes>
     
    </>
  );
}

export default App;
