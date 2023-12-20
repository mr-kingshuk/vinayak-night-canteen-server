import { userModel } from "../../models/Users/Users.js";

const forgetPassword = async (req, res) =>{
    res.status(200).json({"forget-password": "sends link to reset password"});
};

export default forgetPassword;