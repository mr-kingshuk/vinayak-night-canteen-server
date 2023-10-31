import { userModel } from "../../models/Users/Users.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({
        _id 
    }, process.env.SECRET, {
        expiresIn: '3d'
    })
};

const signupUser = async(req, res) => {
    const { email, password, reEnterPassword, name } = req.body;

    const [error, user] = await userModel.signup(email, password, reEnterPassword, name);
    if(user){
        const userId = user._id;

        //creating a jwt token
        const token = createToken(user._id);
        const name = user.name

        res.status(200).json({name, token});
    }
    else{
        res.status(400).json(error);
    }
};

export default signupUser;