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

export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProjectById = async (id) => {
  const response = await axios.get(`${API_URL}/projects/${id}`);
  return response.data.data;
};

export const createProject = async (newProject) => {
  const response = await axios.post(
    `${API_URL}/projects`,
    newProject,
    getAuthConfig(),
  );
  return response.data;
};

export const updateProject = async ({ id, newProject }) => {
  const response = await axios.put(
    `${API_URL}/projects/${id}`,
    newProject,
    getAuthConfig(),
  );
  return response.data;
};

export const deleteProject = async (id) => {
  await axios.delete(`${API_URL}/projects/${id}`, getAuthConfig());
};
