import express from "express";

// import controllers
import { getSummary } from "../controllers/dashboardController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route to get dashboard summary
router.get("/", auth, getSummary);

export default router;
