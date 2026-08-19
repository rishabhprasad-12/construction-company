import Career from "../models/Career.js";
import ApiError from "../utils/ApiError.js";

export const getAllCareers = async () => {
  const careers = await Career.find({ isActive: true }).sort({ createdAt: -1 });
  return careers;
};

export const getCareerById = async (id) => {
  const career = await Career.findById(id);

  if (!career) {
    throw new ApiError(404, "Career not found");
  }

  return career;
};

export const createCareer = async (data) => {
  const career = await Career.create(data);
  return career;
};

export const updateCareer = async (id, data) => {
  const career = await Career.findByIdAndUpdate(id, data, {
    new: true,
    newValidators: true,
  });

  if (!career) {
    throw new ApiError(404, "Career not found");
  }

  return career;
};

export const deleteCareer = async (id) => {
  const career = await Career.findByIdAndDelete(id);

  if (!career) {
    throw new ApiError(404, "Career not found");
  }

  return career;
};
