const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUserController = async (req, res) => {
    const { username, email, password } = req.body;

    const isUserExist = await userModel.findOne({
        $or: [{ username: username }, { email: email }],
    });

    if (isUserExist) {
        return res.status(400).json({
            message:
                `User already exist with this ` +
                (isUserExist.username ? "username" : "email"),
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
    });

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(201).json({
        message: "User regestered Successfully",
        user,
    });
};

module.exports = {
    registerUserController,
};
