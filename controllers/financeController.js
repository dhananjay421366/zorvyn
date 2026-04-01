import Finance from "../models/Finance.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { financeSchema } from "../validators/financeValidator.js";


// Create new finance record
export const createRecord = async (req, res) => {
    try {
        const { error } = financeSchema.validate(req.body);
        if (error) return errorResponse(res, error.message, 400);

        const record = await Finance.create({
            ...req.body,
            createdBy: req.user.id,
        });

        return successResponse(res, "Record created", record);
    } catch (err) {
        return errorResponse(res, err.message);
    }
};


// Get records with optional filters (type, category)
export const getRecords = async (req, res) => {
    try {
        const { type, category } = req.query;

        const filter = {};
        if (type) filter.type = type;
        if (category) filter.category = category;

        const data = await Finance.find(filter);

        return successResponse(res, "Records fetched", data);
    } catch (err) {
        return errorResponse(res, err.message);
    }
};


// Delete record - Admin can delete any record, User can delete only their own records
export const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if record exists
        const record = await Finance.findById(id);
        if (!record) {
            return errorResponse(res, "Record not found", 404);
        }

        // Authorization: Only Admin OR creator can delete
        if (
            req.user.role !== "admin" &&
            record.createdBy.toString() !== req.user.id
        ) {
            return errorResponse(
                res,
                "Unauthorized to delete this record",
                403,
            );
        }

        await record.deleteOne();

        return successResponse(res, "Record deleted successfully");
    } catch (err) {
        return errorResponse(res, err.message);
    }
};


// Update record - Admin can update any record, User can update only their own records
export const updateRecord = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse(res, "Invalid record ID", 400);
        }

        // Validate request body
        const { error } = financeSchema.validate(req.body);
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        // Find record
        const record = await Finance.findById(id);
        if (!record) {
            return errorResponse(res, "Record not found", 404);
        }

        // Authorization: Admin OR owner
        if (
            req.user.role !== "admin" &&
            record.createdBy.toString() !== req.user.id
        ) {
            return errorResponse(
                res,
                "Unauthorized to update this record",
                403,
            );
        }

        // Allowed fields only (prevent unwanted updates)
        const allowedFields = ["amount", "type", "category", "notes", "date"];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                record[field] = req.body[field];
            }
        });

        await record.save();

        return successResponse(res, "Record updated successfully", record);
    } catch (err) {
        return errorResponse(res, err.message);
    }
};
