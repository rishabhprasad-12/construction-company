import mongoose from "mongoose";
import { EMPLOYMENT_TYPE } from "../utils/constants.js";


const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxLength: [100, "Tittle cannot be exceed more than 100 characters"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    employmentType: {
      type: String,
      enum: EMPLOYMENT_TYPE,
      default: "Full-Time",
    },
    experience: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },
    requirements: [{ type: String, trim: true }],
    salary: { type: String, trim: true },
    deadline: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

const Career = mongoose.model("Career", careerSchema);

export default Career;
