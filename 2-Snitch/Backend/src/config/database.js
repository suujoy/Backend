import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async () => {
    const mongoUri = config.MONGO_URI;

    try {
        const connection = await mongoose.connect(mongoUri);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};
