import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.js";

// Middleware to protect routes and attach user info to request
export const auth = (req, res, next) => {
    try {
        // Expecting token in format "Bearer <token>"
        const token = req.headers.authorization?.split(" ")[1];

        // Check if token is present
        if (!token) {
            return errorResponse(res, "Access token missing", 401);
        }

        // Verify token and extract user info
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request object for use in controllers
        req.user = decoded;
        next();
    } catch (error) {
        return errorResponse(res, "Invalid or expired token", 401);
    }
};
