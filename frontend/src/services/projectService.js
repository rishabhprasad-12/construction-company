import api from "../api/axios";

export const getProjects = async () => {
    const response = await api.get('/auth/projects');
    return response.data;
}

export const getFeaturedProjects = async () => {
    const response = await api.get("/auth/projects?featured=true");
    return response.data;
}

export const getProjectById = async (id) => {
    const response = await api.get(`/auth/projects/${id}`);
    return response.data;
}