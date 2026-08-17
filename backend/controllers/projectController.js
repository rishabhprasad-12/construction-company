import * as projectService from "../services/projectService.js";

import asyncHandler from "../middleware/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getAllProjects = asyncHandler(async (req, res) => {
  const isFeatured = req.query.featured;

  const projects = await projectService.getAllProjects({
    featured: isFeatured,
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Projects fetched successfully", projects));
});

export const getProjectById = asyncHandler(async (req, res) => {
  const project = await projectService.getProjectById(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Project fetched successfully", project));
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, "Project created successfully", project));
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.body);

  res
    .status(200)
    .json(new ApiResponse(200, "Project updated successfully", project));
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await projectService.deleteProject(req.params.id);

  res.status(200).json(new ApiResponse(200, "Project deleted successfully"));
});
