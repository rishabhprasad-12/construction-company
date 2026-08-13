import ApiError from "../utils/ApiError.js";

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(403, "Not authenticated");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(404, "Access denied");
    }

    next();
  };
};

export default authorize;