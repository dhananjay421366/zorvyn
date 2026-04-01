import express from "express";

// import controllers
import { auth } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

import {
    createRecord,
    getRecords,
    updateRecord,
    deleteRecord,
} from "../controllers/financeController.js";

const router = express.Router();
// Protected routes - Admin can create/update/delete, Analyst can only read
router.post("/", auth, allowRoles("admin"), createRecord);
router.get("/", auth, allowRoles("admin", "analyst"), getRecords);
router.put("/:id", auth, allowRoles("admin"), updateRecord);
router.delete("/:id", auth, allowRoles("admin"), deleteRecord);

export default router;
