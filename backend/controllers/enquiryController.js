import * as enquiryService from "../services/enquiryService.js";

import asyncHandler from "../middleware/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getAllEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await enquiryService.getAllEnquiries();

  res
    .status(200)
    .json(new ApiResponse(200, "Enquiries fetched successfully", enquiries));
});

export const getEnquiryById = asyncHandler(async (req, res) => {
  const enquiry = await enquiryService.getEnquiryById(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Enquiry fetched successfully", enquiry));
});

export const createEnquiry = asyncHandler(async (req, res) => {
  const userId = req.user?.id || null;

  const enquiry = await enquiryService.createEnquiry(req.body, userId);

  res
    .status(201)
    .json(new ApiResponse(201, "Enquiry created successfully", enquiry));
});

export const updateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await enquiryService.updateEnquiry(req.params.id, req.body);

  res
    .status(200)
    .json(new ApiResponse(200, "Enquiry updated successfully", enquiry));
});

export const deleteEnquiry = asyncHandler(async (req, res) => {
  await enquiryService.deleteEnquiry(req.params.id);

  res.status(200).json(new ApiResponse(200, "Enquiry deleted successfully"));
});
