import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/HomeScreen";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
       <Route path="/" element={<Home />} />
      </Routes>
     
    </>
  );
}

export default App;
