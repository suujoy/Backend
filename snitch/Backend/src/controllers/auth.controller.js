import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const sendTokenResponse = (user, res, message) => {
    const token = jwt.sign(
        {
            id: user._id,
        },
        config.JWT_SECRET,
        {
            expiresIn: "7d",
        },
    );

    res.cookie("token", token);

    res.status(200).json({
        message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            contact: user.contact,
            role: user.role,
        },
    });
};

export const register = async (req, res) => {
    const { email, contact, password, fullName, isSeller } = req.body;

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
            role: isSeller ? "seller" : "buyer",
        });

        await sendTokenResponse(user, res, "User registered successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
