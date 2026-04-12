import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const fetchProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

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
      <p>Visitor count: {data.totalViews}</p>

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

export default Home;
