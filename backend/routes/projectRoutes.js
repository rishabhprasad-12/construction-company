import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controllers/projectController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProjects)
  .post(protect, authorize("admin"), createProject);
router
  .route("/:id")
  .get(getProjectById)
  .put(protect, authorize("admin"), updateProject)
  .delete(protect, authorize("admin"), deleteProject);

export default router;
