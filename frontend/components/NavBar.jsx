import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
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
  );
};

export default NavBar;
