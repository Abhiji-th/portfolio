import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchProjects = async () => {
  const response = await axios.get("http://localhost:8000/api/v1/projects");
  return response.data;
};

const projects = [
  { id: 1, title: "CarPricebot", tech: "React, Node" },
  { id: 2, title: "LUS Classification", tech: "Python, Tensorflow" },
  { id: 3, title: "ECN+/Wait in NS-3", tech: "C++, OOPS" },
];

const App = () => {
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
      <p>Visitor count: 0 (Coming soon with redis!)</p>
      <hr />

      <div style={{ background: "#eee", padding: "10px", borderRadius: "5px" }}>
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
