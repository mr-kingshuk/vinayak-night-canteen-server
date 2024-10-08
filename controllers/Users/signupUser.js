import { userModel } from "../../models/Users/Users.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({
        _id
    }, process.env.SECRET, {
        expiresIn: '3d'
    })
};

const signupUser = async (req, res) => {
    const { email, password, reEnterPassword, name } = req.body;
    try {
        const [error, user] = await userModel.signup(email, password, reEnterPassword, name);
        if (user) {
            const userId = user._id;

            //creating a jwt token
            const token = createToken(user._id);
            const email = user.email
            const name = user.name

            res.status(200).json({ "user": { email, token }, "userDetails": { name } });
        }
        else {
            res.status(400).json(error);
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default signupUser;