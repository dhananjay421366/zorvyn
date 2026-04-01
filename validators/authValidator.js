import Joi from "joi";

// Validation schema for user registration
export const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("viewer", "analyst", "admin"),
});
