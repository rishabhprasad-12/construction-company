import mongoose from "mongoose";
import { ENQUIRY_STATUS } from "../utils/constants.js";

const enquirySchema = new mongoose.Schema(
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
      trim: true,
    },

    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxLength: [150, "Subject cannot exceed 150 characters"],
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxLength: [2000, "Message cannot exceed 2000 characters"],
    },

    status: {
      type: String,
      enum: ENQUIRY_STATUS,
      default: "unread",
    },
  },
  {
    timestamps: true,
  },
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
