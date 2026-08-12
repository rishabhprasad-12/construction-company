import Project from "../models/Project.js";
import ApiError from "../utils/ApiError.js";

export const getAllProjects = async () => {
  const projects = await Project.find().sort({ createdAt: -1 });
  return projects;
};

export const getProjectById = async (id) => {
    const project = await Project.findById(id);

    if (!project) {
        throw new ApiError(404, "Project not found!");
    }

    return project;
}

export const createProject = async (data) => {
    const project = await Project.create(data);
    return project;
}

export const updateProject = async (id, data) => {
    const project = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if(!project) {
        throw new ApiError(404, "Project not found");
    }

    return project;
};

export const deleteProject = async (id) => {
    const project = await Project.findByIdAndDelete(id);

    if(!project) {
        throw new ApiError(404, "Project not found");
    }

    return project;
}