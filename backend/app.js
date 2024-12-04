const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); 

const connectToDB = require("./db/db.js");
const userRouter = require("./routes/user.routes.js");
const captainRouter = require("./routes/captain.routes.js");

connectToDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/captains", captainRouter);

module.exports = app;