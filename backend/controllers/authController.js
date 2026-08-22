import * as authService from "../services/authService.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);

  res
    .status(200)
    .json(new ApiResponse(200, "Registration successful", result));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.loginUser(email, password);

  res.status(200).json(new ApiResponse(200, "Login successful", result));
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user._id);

  res.status(200).json(new ApiResponse(200, "User fetched successfully", user));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user._id, req.body);

  res.status(200).json(new ApiResponse(200, "User updated successfully", user));
})
