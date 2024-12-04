const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({min: 3}).withMessage("First name must be 3 characters long!"),
    body("password").isLength({min: 6}).withMessage("Password must be 6 characters long!"),
], userController.registerUser);


module.exports = router;