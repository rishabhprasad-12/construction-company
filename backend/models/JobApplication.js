import mongoose from "mongoose";
import { APPLICATION_STATUS } from "../utils/constants.js";

const jobApplicationSchema = new mongoose.Schema(
  {
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: [true, "Career is required"],
    },

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

    coverLetter: {
      type: String,
      trim: true,
      maxLength: [2000, "Cover letter cannot exceed 2000 characters"],
    },

    resume: {
      type: String,
      required: [true, "Resume is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: APPLICATION_STATUS,
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;
