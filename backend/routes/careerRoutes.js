import express from "express";

import {
  getAllCareers,
  createCareer,
  getCareerById,
  updateCareer,
  deleteCareer,
} from "../controllers/careerController.js";

const router = express.Router();

router.route("/").get(getAllCareers).post(createCareer);
router.route("/:id").get(getCareerById).put(updateCareer).delete(deleteCareer);

export default router;
