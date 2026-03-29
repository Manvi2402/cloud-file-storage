
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/register";
import Upload from "./components/uploadForm";
import UploadPage from "./pages/UploadPage";
import LandingPage from "./pages/landingpage";

 function App() {


  return (
    <Router>
      <Routes>
         {/* Landing page as default */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element= {<Dashboard/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/upload-page" element={<UploadPage />} />
      </Routes>
    </Router>
  );
 }

export default App;
