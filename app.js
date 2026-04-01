import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

// Import routes
import authRoutes from "./routes/authRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors("*"));
app.use(morgan("dev"));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Global error handler
app.use(errorHandler);

export default app;
