import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchProjects = async () => {
  const response = await axios.get("http://localhost:8000/api/v1/projects");
  return response.data;
};

const loginAPI = async (credentials) => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/auth/login",
    credentials,
  );
  return response.data;
};

const createProject = async ({ newProject, token }) => {
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

const projects = [
  { id: 1, title: "CarPricebot", tech: "React, Node" },
  { id: 2, title: "LUS Classification", tech: "Python, Tensorflow" },
  { id: 3, title: "ECN+/Wait in NS-3", tech: "C++, OOPS" },
];

const App = () => {
  const queryClient = useQueryClient();

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const loginMutation = useMutation({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      setToken(data.token);
      localStorage.setItem("token", data.token);
    },
    onError: (error) => {
      alert(error.response?.data?.error || "Login Failed");
    },
  });

  const projectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setFormData({ title: "", description: "", techStack: "" });
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  const handleLogout = (e) => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const projectPayload = {
      ...formData,
      techStack: formData.techStack.split(",").map((tech) => tech.trim()),
    };

    projectMutation.mutate(projectPayload);
  };

  if (isLoading)
    return <div style={{ padding: "40px" }}>Loading your portfolio...</div>;
  if (isError)
    return (
      <div style={{ padding: "40px", color: "red" }}>
        Error: {error.message}
      </div>
    );

  return (
    <div>
      <h1>Abhijith C | Portfolio</h1>
      <p>Visitor count: 0 (Coming soon with redis!)</p>

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

      <hr />

      <div style={{ background: "#555", padding: "10px", borderRadius: "5px" }}>
        <p>
          📡 <strong>Data Source:</strong> {data.source}
        </p>
        <p>
          🧮 <strong>Projects Loaded:</strong> {data.count}
        </p>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <h2>My Work</h2>
      <div style={{ display: "grid", gap: "20px" }}>
        {/* Mapping over the real MongoDB documents */}
        {data.data.map((project) => (
          <div
            key={project._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p style={{ fontSize: "0.9em", color: "#555" }}>
              <strong>Tech Stack:</strong> {project.techStack.join(" • ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
