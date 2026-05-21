import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
    const connectionInstance = await mongoose.connect(config.MONGO_URI);
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
};

export default connectDB;
