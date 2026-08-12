import express from "express";

import {
  getAllCareers,
  createCareer,
  getCareerById,
  updateCareer,
  deleteCareer,
} from "../controllers/careerController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllCareers)
  .post(protect, authorize("admin"), createCareer);
router
  .route("/:id")
  .get(getCareerById)
  .put(protect, authorize("admin"), updateCareer)
  .delete(protect, authorize("admin"), deleteCareer);

export default router;
