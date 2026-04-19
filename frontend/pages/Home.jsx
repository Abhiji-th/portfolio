import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProjectList from "../components/ProjectList";
import { useDeleteMutation, useProjects } from "../hooks/useProjects";

const Home = () => {
  const { data, isLoading, isError, error } = useProjects();
  const deleteMutation = useDeleteMutation();

  const handleDelete = (id) => {
    if (window.confirm("Delete?")) {
      deleteMutation.mutate(id);
    }
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
      <ProjectList projects={data.data} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
