import { config } from "../config/config.js";
import userModel from "../models/user.model.js";

import jwt from "jsonwebtoken";

/**
 * @name Send token response
 * @param {Object} user - The user object
 * @param {Object} res - The response object
 * @param {string} message - The success message
 */
const sendTokenResponse = async (user, res, message) => {
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

    res.status(201).json({
        message,
        token,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullName: user.fullName,
            role: user.role,
            isAdmin: user.isAdmin,
        },
    });
};

/**
 * @name Register a new user
 * @route POST /api/auth/register
 * @access Public
 */

export const register = async (req, res, next) => {
    const { email, contact, password, fullName, isSeller, isAdmin } = req.body;

    try {
        const existingUser = await userModel.findOne({
            $or: [{ email }, { contact }],
        });

        if (existingUser) {
            return res.status(400).json({
                message: `User with this ${existingUser.email === email ? "email" : "contact"} already exists`,
            });
        }

        const user = await userModel.create({
            email,
            contact,
            password,
            fullName,
            role: isSeller ? "seller" : "buyer",
            isAdmin,
        });

        await sendTokenResponse(user, res, "User registered successfully");
    } catch (error) {
        next(error);
    }
};


export const login = async (req, res, next) => {
    const { identifier, password } = req.body;

    try {
        const user = await userModel.findOne({
            $or: [{ email: identifier }, { contact: identifier }]
        })

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        await sendTokenResponse(user, res, "User logged in successfully");
    } catch (error) {
        next(error);
    }
}