import api from "../api/axios";

export const createJobApplication = async (formData) => {
    const response = await api.post("/auth/applications", formData, {
        headers: {
            "Content-Type": "multipart/formData"
        }
    })

    return response.data;
}