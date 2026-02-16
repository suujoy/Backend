const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User Already exist with this email",
        });
    }

    const user = await userModel.create({
        name,
        email,
        password,
    });

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
    );

    res.cookie("jwt_cookie", token);

    res.status(201).json({
        message: "User Created",
        user,
        token,
    });
});

authRouter.post("/protected", (req, res) => {
    console.log(req.cookies);

    res.status(200).json({
        message: "This is a protected route",
    });
});

/**
 * /api/auth/login
 */

/**
 * Controlar
 */

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User Not Found with this email",
        });
    }

    const isPasswortMatch = user.password === password;

    if (!isPasswortMatch) {
        return res.status(401).json({
            message: "Invalid password",
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
    );

    res.cookie("jwt_token", token);

    res.status(200).json({
        message: "User logged in",
        user,
    });
});

module.exports = authRouter;
