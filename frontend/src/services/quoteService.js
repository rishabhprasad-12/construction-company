import api from "../api/axios";

export const getAllQuotations = async () => {
  const response = await api.get("/auth/quotes");
  return response.data;
}

export const getMyQuotes = async () => {
  const response = await api.get("/auth/quotes/my-quotations");
  return response.data;
};

export const createQuote = async (quoteData) => {
  const response = await api.post("/auth/quotes", quoteData);
  return response.data;
};


