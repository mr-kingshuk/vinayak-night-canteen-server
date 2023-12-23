import { userModel } from "../../models/Users/Users.js";
import bcrypt from "bcrypt";

const resetPassword =  async (req, res) =>{

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    res.status(200).json({"reset-password": "Changes password"});
};

export default resetPassword;