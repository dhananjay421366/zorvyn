import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { registerSchema } from "../validators/authValidator.js";


// Register new user
export const register = async (req, res) => {
    try {
        // Validate input
        const { error } = registerSchema.validate(req.body);
        if (error) return errorResponse(res, error.details[0].message, 400);

        const { name, email, password, role } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return errorResponse(res, "Email already exists", 400);

        const hashed = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role,
        });

        return successResponse(res, "User registered successfully", user);
    } catch (err) {
        return errorResponse(res, err.message);
    }
};

// Login user and return JWT token
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) return errorResponse(res, "User not found", 404);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return errorResponse(res, "Invalid credentials", 400);

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" },
        );

        return successResponse(res, "Login successful", { token });
    } catch (err) {
        return errorResponse(res, err.message);
    }
};
