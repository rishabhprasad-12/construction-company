import express from "express";

import {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getMyApplications,
} from "../controllers/jobApplicationController.js";

import upload from "../middleware/multerMiddleware.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, authorize("admin"), getAllApplications)
  .post(protect, upload.single("resume"), createApplication);

router
  .route("/my-applications")
  .get(protect, authorize("customer"), getMyApplications);

router
  .route("/:id")
  .get(protect, authorize("admin"), getApplicationById)
  .delete(protect, authorize("admin"), deleteApplication);

router
  .route("/:id/status")
  .patch(protect, authorize("admin"), updateApplicationStatus);

export default router;
