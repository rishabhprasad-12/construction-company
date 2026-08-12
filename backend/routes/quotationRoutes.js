import express from "express";
import {
  createQuotation,
  deleteQuotation,
  getAllQuotations,
  getQuotationById,
  updateQuotation,
} from "../controllers/quotationController.js";

const router = express.Router();

router.route("/").get(getAllQuotations).post(createQuotation);
router
  .route("/:id")
  .get(getQuotationById)
  .put(updateQuotation)
  .delete(deleteQuotation);

export default router;
