import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home.jsx";
import Admin from "../pages/Admin.jsx";
import { useAuth } from "../context/authContext.jsx";
import NavBar from "../components/NavBar.jsx";

const App = () => {
  return (
    <div>
      <NavBar />

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/:id" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
