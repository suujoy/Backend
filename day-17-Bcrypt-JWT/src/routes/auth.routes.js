const express = require("express");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const isUserAlreadyExist =await userModel.findOne({ email });

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User is already exist with this email",
        });
    }

    const user = await userModel.create({ name, email, password });

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
    );

    req.cookie('jwt_cookie',token)

    res.status(201).json({
        message: "User Created",
        user,
        token,
    });
});


authRouter.post('/protect',async(req,res)=>{
    console.log(res.cookies)
})

module.exports = authRouter;
