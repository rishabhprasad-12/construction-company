import api from "../api/axios";

export const getServices = async () => {
    const response = await api.get("/auth/services");
    return response.data;
}

export const getServicesById = async (id) => {
    const response = await api.get(`/auth/services/${id}`);
    return response.data;
}