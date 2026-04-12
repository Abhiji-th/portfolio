import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home.jsx";
import Admin from "../pages/Admin.jsx";

const App = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          paddingBottom: "20px",
          borderBottom: "1px solid #eee",
        }}
      >
        <h2>
          <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
            Abhijith C | Dev
          </Link>
        </h2>

        <div>
          <Link
            to="/"
            style={{
              marginRight: "15px",
              textDecoration: "none",
              color: "#007bff",
            }}
          >
            Portfolio
          </Link>

          {token ? (
            <>
              <Link
                to="/admin"
                style={{
                  marginRight: "15px",
                  textDecoration: "none",
                  color: "#007bff",
                }}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  padding: "5px 10px",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin"
              style={{
                textDecoration: "none",
                color: "#666",
                fontSize: "0.9em",
              }}
            >
              Admin Login
            </Link>
          )}
        </div>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
