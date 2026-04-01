import Joi from "joi";

// Validation schema for financial entry
export const financeSchema = Joi.object({
    amount: Joi.number().positive().required(),
    type: Joi.string().valid("income", "expense").required(),
    category: Joi.string().required(),
    notes: Joi.string().allow(""),
});
