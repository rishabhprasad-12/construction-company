import api from "../api/axios";

export const createQuote = async (quoteData) => {
  const response = await api.post("/auth/quotes", quoteData);

  return response.data;
};
