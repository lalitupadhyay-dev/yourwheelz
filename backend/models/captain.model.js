const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "Firstname must be 3 characters long!"],
        },
        lastname: {
            type: String,
            minlength: [3, "Lastname must be 3 characters long!"],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    sockedId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    vehicle: {
        color: {
            type: String,
            require: true,
            minlength: [3, "Color name must be 3 characters long!"],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Vehicle number must be 3 characters long!"],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be atleat 1!"],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "motorcycle", "auto"],
        }
    },
    location: {
        lat: {
            type: Number,
        },
        long: {
            type: Number,
        }
    }
});

captainSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
}

captainSchema.methods.comparePassword = async (password) => {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;