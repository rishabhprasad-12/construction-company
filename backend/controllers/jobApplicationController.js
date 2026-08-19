import asyncHandler from "../middleware/asyncHandler.js";
import * as jobApplicationService from "../services/jobApplicationService.js";
import ApiError from "../utils/ApiError.js";
import APiResponse from "../utils/ApiResponse.js";

export const createApplication = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Resume is required");
  }

  const applicationData = {
    career: req.body.career,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    coverLetter: req.body.coverLetter,

    // Temporary approach
    // We will replace this with Cloudinary URL
    resume: req.file.originalname,
  };

  const application =
    await jobApplicationService.createApplication(applicationData);

  res.status(201).json(201, "Application submitted successfully", application);
});

export const getAllApplications = asyncHandler(async (req, res) => {
  const applications = await jobApplicationService.getAllApplications();

  res.status(200).json(200, "Applications fetched successfully", applications);
});

export const getApplicationById = asyncHandler(async (req, res) => {
  const application = await jobApplicationService.getApplicationById(
    req.params.id,
  );

  res.status(200).json(200, "Application fetched successfully");
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await jobApplicationService.updateApplicationStatus(
    req.params.id,
    req.body.status,
  );

  res.status(200).json(200, "Application status updated successfully");
});

export const deleteApplication = asyncHandler(async (req, res) => {
  await jobApplicationService.deleteApplication(req.params.id);

  res.status(200).json(200, "Application deleted successfully");
});
