import dotenv from "dotenv";
dotenv.config();
import { userModel } from "../../models/Users/Users.js";
import jwt from 'jsonwebtoken';

const verifyLink = async (req, res) => {
    const { id, token } = req.params;
    const BASE_URL_CLIENT = process.env.BASE_URL_CLIENT;
    try {
        const oldUser = await userModel.findOne({ _id: id });
        if (!oldUser) {
            return res.status(404).json({ state: "error", message: "User is not found" });
        }
        const verify = jwt.verify(token, process.env.SECRET);
        if (verify.email === oldUser.email) {
            
            // Split the token by periods (.) to get individual parts of token
            const parts = token.split('.');
            //redirects to frontend route
            return res.redirect(`${BASE_URL_CLIENT}/reset-password/${oldUser._id}/${parts[0]}/${parts[1]}/${parts[2]}`);
        }
        return res.status(404).json({ state: "error", message: "Invalid Link!!" });
    }
    catch (err) {
        return res.status(500).json({ err: err.message });
    }
};

export default verifyLink; 