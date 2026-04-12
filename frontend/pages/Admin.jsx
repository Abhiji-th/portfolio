import React from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

const loginAPI = async (credentials) => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/auth/login",
    credentials,
  );
  return response.data;
};

const createProject = async (newProject) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    "http://localhost:8000/api/v1/projects",
    newProject,
    config,
  );
  return response.data;
};

const Admin = ({ setToken }) => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
  });

  const projectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setFormData({ title: "", description: "", techStack: "" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const projectPayload = {
      ...formData,
      techStack: formData.techStack.split(",").map((tech) => tech.trim()),
    };

    projectMutation.mutate(projectPayload);
  };

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const loginMutation = useMutation({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      setToken(data.token);
      localStorage.setItem("token", data.token);
    },
    onError: (error) => {
      console.log(error.response?.data?.error || "Login Failed");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  return (
    <div>
      {!token ? (
        <div
          style={{
            background: "#e9ecef",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px",
          }}
        >
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin} style={{ display: "flex", gap: "10px" }}>
            <input
              type="email"
              placeholder="Email"
              required
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              style={{ padding: "8px" }}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              style={{ padding: "8px" }}
            />
            <button
              type="submit"
              style={{
                padding: "8px 15px",
                background: "#28a745",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div
          style={{
            background: "#000",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px",
          }}
        >
          <h2>➕ Add New Project</h2>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              type="text"
              placeholder="Project Title"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              style={{ padding: "8px" }}
            />
            <textarea
              placeholder="Description"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              style={{ padding: "8px", minHeight: "60px" }}
            />
            <input
              type="text"
              placeholder="Tech Stack (comma separated, e.g., React, Node, Redis)"
              required
              value={formData.techStack}
              onChange={(e) =>
                setFormData({ ...formData, techStack: e.target.value })
              }
              style={{ padding: "8px" }}
            />
            <button
              type="submit"
              disabled={projectMutation.isPending}
              style={{
                padding: "10px",
                background: "#007bff",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              {projectMutation.isPending ? "Saving..." : "Save Project"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
