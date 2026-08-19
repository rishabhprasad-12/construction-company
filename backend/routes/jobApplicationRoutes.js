import express from "express";

import {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/jobApplicationController.js";

import upload from "../middleware/multerMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, roleMiddleware("admin"), getAllApplications)
  .post(upload.single("resume"), createApplication);

router
  .route("/:id")
  .get(authMiddleware, roleMiddleware("admin"), getApplicationById)
  .delete(authMiddleware, roleMiddleware("admin"), deleteApplication);

router
  .route("/:id/status")
  .patch(authMiddleware, roleMiddleware("admin"), updateApplicationStatus);

export default router;
