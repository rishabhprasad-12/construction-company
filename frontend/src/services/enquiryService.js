import api from "../api/axios";

export const createEnquiry = async (enquiryData) => {
    const response = await api.post("/auth/enquiries", enquiryData);
    return response.data;
}