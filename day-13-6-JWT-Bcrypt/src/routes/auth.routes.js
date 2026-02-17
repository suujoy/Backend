const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");

/**
 * /api/auth/register
 */
authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const isUserAlreadyExist = await userModel.findOne({ email });

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User is already exist in the database",
        });
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({ name, email, password: hash });

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
    );
    res.cookie("jwt_cookie", token);

    res.status(201).json({
        message: "User Created",
        user,
        token,
    });
});

/**
 * /api/auth/protected
 */
authRouter.post("/protect", async (req, res) => {
    console.log(req.cookies);
});

/**
 * /api/auth/login
 * Controllar
 */

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "User Not Found",
        });
    }

    if (
        user.password !==
        crypto.createHash("md5").update(password).digest("hex")
    ) {
        return res.status(401).json({
            message: "Password not matched",
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
    );

    res.status(200).json({
        message: "Login successfully",
        token,
    });
});

module.exports = authRouter;
