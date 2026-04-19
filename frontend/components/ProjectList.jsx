import React from "react";
import { useAuth } from "../context/authContext";

const ProjectList = ({ projects, onDelete }) => {
  const { token } = useAuth();
  return (
    <div style={{ display: "grid", gap: "20px" }}>
      {/* Mapping over the real MongoDB documents */}
      {projects.map((project) => (
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
          {token && (
            <button
              onClick={() => onDelete(project._id)}
              style={{
                color: "red",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
