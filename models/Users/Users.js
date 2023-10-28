import mongoose from "mongoose";

import login from "./login.js";
import signup from "./signup.js";

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    name : {
        type: String
    },
    phoneNo : {
        type: Number
    },
    rollNo: {
        type: String
    },
    hostel : {
        type: String
    },
}, { timestamps: true});

userSchema.statics.signup = signup;
userSchema.statics.login = login;

export const userModel = mongoose.model('user', userSchema);