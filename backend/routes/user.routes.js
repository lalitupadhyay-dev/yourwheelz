const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user.controller.js");
const userMiddleware = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be 3 characters long!"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6 characters long!"),
], userController.registerUser);

router.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6 characters long!"),
], userController.loginUser);

router.get("/profile", userMiddleware.authUser, userController.getUserProfile);

router.get("/logout", userMiddleware.authUser, userController.logoutUser);

module.exports = router;