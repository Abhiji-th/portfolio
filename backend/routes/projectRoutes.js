import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProjects).post(protect, createProject);

router
  .route("/:id")
  .get(getProjectById)
  .delete(protect, deleteProject)
  .put(protect, updateProject);

export default router;
