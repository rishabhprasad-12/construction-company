import express from "express";
import {
  createQuotation,
  deleteQuotation,
  getAllQuotations,
  getMyQuotations,
  getQuotationById,
  updateQuotation,
} from "../controllers/quotationController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, authorize("admin"), getAllQuotations)
  .post(protect, createQuotation);

router
  .route("/my-quotations")
  .get(protect, authorize("customer"), getMyQuotations);
  
router
  .route("/:id")
  .get(protect, authorize("admin"), getQuotationById)
  .put(protect, authorize("admin"), updateQuotation)
  .delete(protect, authorize("admin"), deleteQuotation);

export default router;
