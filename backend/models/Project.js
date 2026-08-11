import mongoose from "mongoose";
import { PROJECT_CATEGORY } from "../utils/constants.js";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxLength: [100, "Title cannot be exceed 100 character"],
    },
    slug: {
      type: String,
      required: [true, "Project slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Project category is required"],
      enum: PROJECT_CATEGORY,
    },
    location: {
      type: String,
      required: [true, "Project location is required"],
      trim: true,
    },
    client: {
      type: String,
      trim: true,
    },
    startDate: { type: Date },
    completionDate: { type: Date },
    status: {
      type: String,
      enum: PROJECT_STATUS,
      default: "ongoing",
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    features: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
