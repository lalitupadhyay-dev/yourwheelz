const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model.js");
const captainService = require("../services/captain.service.js");

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainExists = await captainModel.findOne({ email });

    if (isCaptainExists) {
        return res.status(400).json({ message: "Captain Already Exists!" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    console.log(captain);

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });

}