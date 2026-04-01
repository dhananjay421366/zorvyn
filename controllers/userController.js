import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/response.js";

// Get all users - Admin only
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        return successResponse(res, "Users fetched successfully", users);
    } catch (err) {
        return errorResponse(res, err.message);
    }
};

// Get user by ID - Admin or self
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) return errorResponse(res, "User not found", 404);

        return successResponse(res, "User fetched", user);
    } catch (err) {
        return errorResponse(res, err.message);
    }
};

// Update user - Admin can update any user, User can update only their own profile
export const updateUser = async (req, res) => {
    try {
        const { role, isActive, name } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) return errorResponse(res, "User not found", 404);

        // Allow self update OR admin
        if (req.user.id !== user.id && req.user.role !== "admin") {
            return errorResponse(res, "Unauthorized", 403);
        }

        if (name) user.name = name;
        if (role && req.user.role === "admin") user.role = role;
        if (typeof isActive !== "undefined") user.isActive = isActive;

        await user.save();

        return successResponse(res, "User updated", user);
    } catch (err) {
        return errorResponse(res, err.message);
    }
};

// Delete user - Admin only
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return errorResponse(res, "User not found", 404);

        await user.deleteOne();

        return successResponse(res, "User deleted");
    } catch (err) {
        return errorResponse(res, err.message);
    }
};
