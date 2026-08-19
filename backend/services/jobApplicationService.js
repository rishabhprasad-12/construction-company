import JobApplication from "../models/JobApplication.js";
import Career from "../models/Career.js";
import ApiError from "../utils/ApiError.js";

export const getAllApplications = async () => {
  const applications = await JobApplication.find()
    .populate("career", "title department location employmentType")
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  return applications;
};

export const getApplicationById = async (id) => {
  const application = await JobApplication.findById(id)
    .populate("career", "title department location employmentType")
    .populate("user", "name email");

  if (!application) {
    throw new ApiError(404, "Job Application not found");
  }

  return application;
};

export const createApplication = async (data) => {
  const career = await Career.findById(data.career);

  if (!career) {
    throw new ApiError(404, "Career not found");
  }

  if (!career.isActive) {
    throw new ApiError(400, "Application are closed for this position");
  }

  if (career.deadline && new Date(career.deadline) > new Date()) {
    throw new ApiError(400, "Application deadline has passed");
  }

  const application = await JobApplication.create(data);

  return application;
};

export const updateApplicationStatus = async (id, status) => {
  const application = await JobApplication.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  return application;
};

export const deleteApplication = async (id) => {
  const application = await Application.findById(id);

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  return application;
};
