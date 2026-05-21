import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const sendToken = (user, res) => {
    const token = jwt.sign(
        {
            id: user._id,
        },
        config.JWT_SECRET,
        {
            expiresIn: "7d",
        },
    );
};

export const registerUser = async (req, res, next) => {
    const { email, contact, password, fullName } = req.body;

    try {
        const existingUser = await userModel.findOne({
            $or: [{ email }, { contact }],
        });
        if (existingUser) {
            return res.status(400).json({
                message: `user with this ${existingUser.email === email ? "email" : "contact"} already exists`,
            });
        }
        const user = await userModel.create({
            email,
            contact,
            password,
            fullName,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
