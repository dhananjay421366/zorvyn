import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(" MongoDB Connected");
    } catch (error) {
        console.error(" Error to connect MongoDB:", error.message);
        process.exit(1);
    }
};
