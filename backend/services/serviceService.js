import Service from "../models/Service.js";
import ApiError from "../utils/ApiError.js";

export const getAllServices = async () => {
  const services = await Service.find()
    .sort({ createdAt: -1 });
    
  return services;
};

export const getServiceById = async (id) => {
  const service = await Service.findById(id);

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  return service;
};

export const createService = async (data) => {
  const service = await Service.create(data);
  return service;
};

export const updateService = async (id, data) => {
  const service = await Service.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  return service;
};

export const deleteService = async (id) => {
  const service = await Service.findByIdAndDelete(id);

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  return service;
};
