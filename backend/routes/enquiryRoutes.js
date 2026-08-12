import express from "express";
import {
  createEnquiry,
  deleteEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
} from "../controllers/enquiryController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, authorize("admin"), getAllEnquiries)
  .post(createEnquiry);
router
  .route("/:id")
  .get(protect, authorize("admin"), getEnquiryById)
  .put(protect, authorize("admin"), updateEnquiry)
  .delete(protect, authorize("admin"), deleteEnquiry);

export default router;
