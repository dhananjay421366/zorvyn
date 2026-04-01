import { errorResponse } from "../utils/response.js";

// Middleware to allow access only to specified roles
export const allowRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return errorResponse(
                res,
                "Forbidden: insufficient permissions",
                403,
            );
        }
        next();
    };
};
