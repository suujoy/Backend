const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authRoute = express.Router();

/**
 * /api/auth/register
 */

authRoute.post("/register", async (req, res) => {
    const { email, password, name } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });

    if (isUserAlreadyExist) {
        return res.status(200).json({
            message: "User already exist with this email id",
        });
    }
    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({
        email,
        password: hash,
        name,
    });

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
 * /api/auth/protect
 */

authRoute.post("/protect", async (req, res) => {
    console.log(req.cookies);
});

/**
 * /api/auth/login
 */

authRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "User Not Found",
        });
    }

    const isPasswordMatched = await user.password;

    if (
        isPasswordMatched !==
        crypto.createHash("md5").update(password).digest("hex")
    ) {
        return res.status(401).json({
            message: "password not matched",
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
    );

    res.cookie("jwt_cookie", token);

    res.status(200).json({
        message: "User Loggin successfully",
        token,
    });
});

/**
 * /api/auth/get-me
 */

authRoute.get("/get-me", async (req, res) => {
    const token = req.cookies.jwt_cookie;

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decode.id);

    res.status(200).json({
        name: user.name,
        email: user.email,
    });
});

module.exports = authRoute;
