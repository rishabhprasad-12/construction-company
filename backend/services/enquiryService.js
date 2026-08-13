import Enquiry from "../models/Enquiry.js";
import ApiError from "../utils/ApiError.js";

export const getAllEnquiries = async () => {
  return await Enquiry.find()
    .populate("user", "name email phone")
    .sort({ ceratedAt: -1 });
};

export const getEnquiryById = async (id) => {
  const enquiry = await Enquiry.findById(id);

  if (!enquiry) {
    throw new ApiError(404, "Enquiry not found");
  }

  return enquiry;
};

export const createEnquiry = async (data, userId = null) => {
  return await Enquiry.create({ ...data, user: userId });
};

export const updateEnquiry = async (id, data) => {
  const enquiry = await Enquiry.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!enquiry) {
    throw new ApiError(404, "Enquiry not found");
  }

  return enquiry;
};

export const deleteEnquiry = async (id) => {
  const enquiry = await Enquiry.findByIdAndDelete(id);

  if (!enquiry) {
    throw new ApiError(404, "Enquiry not found");
  }

  return enquiry;
};
