import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/HomeScreen";
import MembersList from "./pages/Member/MemberList";
import ProjectsList from "./pages/Project/ProjectsList";
import LoginScreen from "./pages/LoginScreen";
import SignupScreen from "./pages/SignupScreen";
import CreateProject from "./pages/Project/CreateProject";
import UpdateProject from "./pages/Project/UpdateProject";
// import CreateMember from "./pages/Member/CreateMember";
import UpdateMember from "./pages/Member/UpdateMember";
import Footer from "./components/Footer";

function App() {
  return (
    <>
     <div className="d-flex flex-column min-vh-100">
      <Navbar />
       <div className="flex-grow-1">
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />

       {/* Members */}
        <Route
          path="/members"
          element={<MembersList />}
        />
         {/* <Route
          path="/members/create"
          element={<CreateMember />}
        /> */}
          <Route
          path="/members/:id/edit"
          element={<UpdateMember />}
        />

        {/* Projects */}
        <Route
          path="/projects"
          element={<ProjectsList />}
        />
          <Route
          path="/projects/create"
          element={<CreateProject />}
        />
           <Route
          path="/projects/:id/edit"
          element={<UpdateProject />}
        />
      </Routes>
      </div>
      <Footer />
      </div>
     
    </>
  );
}

export default App;
