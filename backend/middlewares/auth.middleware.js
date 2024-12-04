const userModel = require("../models/user.model.js");
const blackListTokenModel = require("../models/blacklistToken.model.js");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlackListedToken = await blackListTokenModel.findOne({token: token});

    if (isBlackListedToken) {
        res.status(401).json({message: "Unauthorized"});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decodedToken._id);

        req.user = user;

        return next();

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }

}