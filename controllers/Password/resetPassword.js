import mongoose from "mongoose";
import { userModel } from "../../models/Users/Users.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from 'jsonwebtoken';

const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password, passwordAgain } = req.body;

    if (!password || !passwordAgain) {
        return res.status(404).json({ error: "All feilds must be filled" });
    }

    if (password !== passwordAgain) {
        return res.status(404).json({ error: "Passwords doesn't match" });
    }

    if (!validator.isStrongPassword(password))
        return res.status(404).json({ error: "Password is must be atleast 8 characters, conatain atleast one capital, small, and special character and number" });

    try {
        //checking if user exists
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Reset Email Link has expired!!" })
        }

        const oldUser = await userModel.findOne({ _id: id });
        
        if (!oldUser) {
            return res.status(404).json({ error: "User is not found" });
        }
        const verify = jwt.verify(token, process.env.SECRET);
        if (verify && verify.email !== oldUser.email) {
            //invalid reset password link
            return res.status(404).json({ error: "Invalid Link!!" });
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const updatedUser = await userModel.findOneAndUpdate(
            { _id: id },
            { password: hash },
            { new: true }
        );
        return res.status(200).json(updatedUser);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};

export default resetPassword;