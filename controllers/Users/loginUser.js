import { userModel } from "../../models/Users/Users.js";
import { userTypeModel } from "../../models/Users/UserTypes.js";
import jwt from "jsonwebtoken";

const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try{
        const user = await userModel.login(email, password);

        //creating a jwt token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    }
    catch(error){
        res.status(400).json({ error: error.message})
    }
};

export default loginUser;