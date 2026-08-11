import mongoose from "mongoose";
import { PROJECT_TYPE, QUOTATION_STATUS } from "../utils/constants.js";

const quotationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    projectType: {
      type: String,
      required: [true, "Project type is required"],
      enum: PROJECT_TYPE,
    },

    projectDescription: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Project location is required"],
      trim: true,
    },

    estimatedBudget: {
      type: Number,
      min: [0, "Budget cannot be negative"],
    },

    preferredStartDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: QUOTATION_STATUS,
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Quotation = mongoose.model("Quotation", quotationSchema);

export default Quotation;
