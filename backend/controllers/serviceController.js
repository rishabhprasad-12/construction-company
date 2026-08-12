import * as serviceService from "../services/serviceService.js";

import asyncHandler from "../middleware/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getAllServices = asyncHandler(async (req, res) => {
  const services = await serviceService.getAllServices();

  res
    .status(200)
    .json(new ApiResponse(200, "Services fetched successfully", services));
});

export const getServiceById = asyncHandler(async (req, res) => {
  const service = await serviceService.getServiceById(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Service fetched successfully", service));
});

export const createService = asyncHandler(async (req, res) => {
  const service = await serviceService.createService(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, "Service created successfully", service));
});

export const updateService = asyncHandler(async (req, res) =>  {
    const service = await serviceService.updateService(req.params.id, req.body);

    res.status(200).json(new ApiResponse(200, "Service updated successfully", service));
});

export const deleteService = asyncHandler(async (req, res) => {
    const service = await serviceService.deleteService(req.params.id);

    res.status(200).json(new ApiResponse(200, "Service updated successfully"));
})
