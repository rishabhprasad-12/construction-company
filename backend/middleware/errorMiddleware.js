import ApiError from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  // MongoDB Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    const value = err.keyValue?.[field];

    err = new ApiError(409, `${field} already exists`, {
      field,
      value,
    });
  }

  // Mongoose Validation Error
  else if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));

    err = new ApiError(400, "Validation failed", errors);
  }

  // Invalid MongoDB ObjectId
  else if (err.name === "CastError") {
    err = new ApiError(400, "Invalid ID");
  }

  // Invalid JSON
  else if (err instanceof SyntaxError && err.status === 400) {
    err = new ApiError(400, "Invalid JSON");
  }

  // Unknown Error
  else if (!(err instanceof ApiError)) {
    err = new ApiError(500, "Internal server error");
  }

  return res.status(err.statusCode).json({
    success: err.success,
    message: err.message,
    ...(err.errors && { errors: err.errors }),
  });
};

export default errorMiddleware;
