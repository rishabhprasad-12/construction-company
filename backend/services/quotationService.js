import Quotation from "../models/Quotation.js";
import ApiError from "../utils/ApiError.js";

export const getAllQuotations = async () => {
  const quotations = await Quotation.find().sort({ createdAt: -1 });
  return quotations;
};

export const getMyQuotations = async (userId) => {
  const quotation = await Quotation.find({ user: userId }).sort({
    createdAt: -1,
  });
  
  return quotation;
};

export const getQuotationById = async (id) => {
  const quotation = await Quotation.findById(id);

  if (!quotation) {
    throw new ApiError(404, "Quotation not found");
  }

  return quotation;
};

export const createQuotation = async (data, userId) => {
  const quotation = await Quotation.create({
    ...data,
    user: userId,
  });

  return quotation;
};

export const updateQuotation = async (id, data) => {
  const quotation = await Quotation.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!quotation) {
    throw new ApiError(404, "Quotation not found");
  }

  return quotation;
};

export const deleteQuotation = async (id) => {
  const quotation = await Quotation.findByIdAndDelete(id);

  if (!quotation) {
    throw new ApiError(404, "Quotation not found");
  }

  return quotation;
};
