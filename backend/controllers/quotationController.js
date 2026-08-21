import * as quotationService from "../services/quotationService.js";

import asyncHandler from "../middleware/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getAllQuotations = asyncHandler(async (req, res) => {
  const quotations = await quotationService.getAllQuotations();

  res
    .status(200)
    .json(new ApiResponse(200, "Quotations fetched successfully", quotations));
});

export const getMyQuotations = asyncHandler(async (req, res) => {
  const quotations = await quotationService.getMyQuotations( req.user._id );

  res
    .status(200)
    .json(new ApiResponse(200, "Quotation fetched successfully", quotations));
});

export const getQuotationById = asyncHandler(async (req, res) => {
  const quotation = await quotationService.getQuotationById(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Quotation fetched successfully", quotation));
});

export const createQuotation = asyncHandler(async (req, res) => {
  const userId = req.user?._id || null;

  const quotation = await quotationService.createQuotation(req.body, userId);

  res
    .status(201)
    .json(new ApiResponse(201, "Quotation created successfully", quotation));
});

export const updateQuotation = asyncHandler(async (req, res) => {
  const quotation = await quotationService.updateQuotation(
    req.params.id,
    req.body,
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Quotation updated successfully", quotation));
});

export const deleteQuotation = asyncHandler(async (req, res) => {
  const quotation = await quotationService.deleteQuotation(req.params.id);

  res.status(200).json(new ApiResponse(200, "Quotation deleted successfully"));
});
