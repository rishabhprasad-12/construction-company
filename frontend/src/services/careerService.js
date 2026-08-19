import api from "../api/axios";

export const getCareers = async () => {
  const response = await api.get("/auth/careers");

  return response.data;
};

export const getCareerById = async (id) => {
  const response = await api.get(`/auth/careers/${id}`);

  return response.data;
};
