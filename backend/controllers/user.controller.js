const userModel = require("../models/user.model.js");
const blackListTokenModel = require("../models/blacklistToken.model.js");
const userService = require("../services/user.services.js");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors });
    }

    const { fullname, email, password } = req.body;

    const isUserExists = await userModel.findOne({ email });

    if (isUserExists) {
        return res.status(400).json({message: "User Already Exists!"});
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
    })

    const token = await user.generateAuthToken();

    res.status(201).json({ token, user });

}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors });
    }

    /**
     * If there is no error in validation;
     */
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email
    }).select("+password");

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password!" });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({ message: "Invalid email or password!" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token);

    res.status(200).json({ token, user });

}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    }

    await blackListTokenModel.create({token});

    res.clearCookie("token");

    res.status(200).json({ message: "Logged Out" });
}

