import { redisClient } from "../config/redis.js";
import Project from "../models/Project.js";

const getProjects = async (req, res) => {
  try {
    const totalViews = await redisClient.incr("portfolio_views");

    const cachedProjects = await redisClient.get("portfolio_projects");

    if (cachedProjects) {
      return res.status(200).json({
        success: true,
        source: "Redis Cache",
        totalViews,
        count: JSON.parse(cachedProjects).length,
        data: JSON.parse(cachedProjects),
      });
    }

    const projects = await Project.find();

    await redisClient.setEx(
      "portfolio_projects",
      3600,
      JSON.stringify(projects),
    );

    res.status(200).json({
      success: true,
      source: "MongoDB",
      totalViews,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);

    await redisClient.del("portfolio_projects");

    res.status(201).json({
      success: true,
      data: newProject,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export { getProjects, createProject };
