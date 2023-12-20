import { userModel } from "../../models/Users/Users.js";

const resetPassword =  async (req, res) =>{
    res.status(200).json({"reset-password": "Changes password"});
};

export default resetPassword;