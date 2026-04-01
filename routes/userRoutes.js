import express from "express";
// import controllers
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/userController.js";

import { auth } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Admin Routes
 */
router.get("/", auth, allowRoles("admin"), getAllUsers);
router.delete("/:id", auth, allowRoles("admin"), deleteUser);

/**
 * Shared Routes (Admin / Self)
 */
router.get("/:id", auth, getUserById);
router.put("/:id", auth, updateUser);

export default router;
