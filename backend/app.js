const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const connectToDB = require("./db/db.js");
const userRouter = require("./routes/user.routes.js");

connectToDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/users", userRouter);

module.exports = app;