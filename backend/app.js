import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth/", authRoutes);
app.use("/api/auth/projects", projectRoutes);
app.use("/api/auth/services", serviceRoutes);
app.use("/api/auth/careers", careerRoutes);
app.use("/api/auth/quotes", quotationRoutes);
app.use("/api/auth/enquiries", enquiryRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
