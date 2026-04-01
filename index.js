import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./utils/db.js";

// Load environment variables
dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
