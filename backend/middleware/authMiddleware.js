import jwt from "jsonwebtoken";
import User from "../models/User.js";

import asyncHandler from "./asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized. Token Missing");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      throw new ApiError(401, "User account is inactive");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("JWT Error: ", error.message);
    throw new ApiError(401, "Invalid or expired token", error.message);
  }
};

export default protect;
