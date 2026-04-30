import React from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { loginAPI } from "../api/projects";
import { useGetProjectById, useProjectMutation } from "../hooks/useProjects";
import { useLoginMutation } from "../hooks/useLogin";
import { useAuth } from "../context/authContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Admin = () => {
  const { token } = useAuth();
  const { id } = useParams();

  const loginMutation = useLoginMutation();
  const projectMutation = useProjectMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
  });

  const { data, isLoading } = useGetProjectById(id);

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        description: data.description || "",
        techStack: data.techStack || "",
      });
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const projectPayload = {
      ...formData,
      techStack: formData.techStack.split(",").map((tech) => tech.trim()),
    };

    projectMutation.mutate(projectPayload, {
      onSuccess: () => {
        setFormData({ title: "", description: "", techStack: "" });
      },
    });
  };

  const [loginData, setLoginData] = useState({ email: "", password: "" });

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
