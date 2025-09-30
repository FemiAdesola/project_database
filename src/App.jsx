import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/HomeScreen";
import MembersList from "./pages/Member/MemberList";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
       <Route path="/" element={<Home />} />

       {/* Members */}
        <Route
          path="/members"
          element={<MembersList />}
        />
      </Routes>
     
    </>
  );
}

export default App;
