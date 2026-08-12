import * as careerService from "../services/careerService.js";

import asyncHandler from "../middleware/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getAllCareers = asyncHandler(async (req, res) => {
  const careers = await careerService.getAllCareers();

  res
    .status(200)
    .json(new ApiResponse(200, "Careers fetched successfully", careers));
});

export const getCareerById = asyncHandler(async (req, res) => {
  const career = await careerService.getCareerById(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Career fetched successfully", career));
});

export const createCareer = asyncHandler(async (req, res) => {
  const career = await careerService.createCareer(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, "Career created successfully", career));
});

export const updateCareer = asyncHandler(async (req, res) => {
  const career = await careerService.updateCareer(req.params.id, req.body);

  res
    .status(200)
    .json(new ApiResponse(200, "Career updated successfully", career));
});

export const deleteCareer = asyncHandler(async (req, res) => {
  const career = await careerService.deleteCareer(req.params.id);

  res.status(200).json(new ApiResponse(200, "Career deleted successfully"));
});
