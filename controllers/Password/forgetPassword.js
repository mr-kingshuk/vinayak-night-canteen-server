import { userModel } from "../../models/Users/Users.js";
import jwt from 'jsonwebtoken';

const createToken = (data) => {
    return jwt.sign(data , process.env.SECRET, { expiresIn: '1d' });
};

const forgetPassword = async (req, res) => {
    const { email } = req.body;
    try{
        const oldUser = await userModel.findOne({ email});
        if(!oldUser){
            return res.status(404).json({state: "error", message:"Email is not found"});
        }
        const token = createToken({email: oldUser.email ,password: oldUser.password}); 
        console.log(token);
        return res.status(200).json({state: "success", message:"Reset Mail sent"});
    }
    catch(err){
        return res.status(500).json({err: err.message});
    }
};

export default forgetPassword;