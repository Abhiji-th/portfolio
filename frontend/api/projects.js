import axios from "axios";
import { useAuth } from "../context/authContext";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const loginAPI = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const fetchProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};

export const createProject = async (newProject) => {
  const response = await axios.post(
    `${API_URL}/projects`,
    newProject,
    getAuthConfig(),
  );
  return response.data;
};

export const deleteProject = async (id) => {
  await axios.delete(`${API_URL}/projects/${id}`, getAuthConfig());
};
