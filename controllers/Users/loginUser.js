import { userModel } from "../../models/Users/Users.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({
        _id
    }, process.env.SECRET, {
        expiresIn: '3d'
    })
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [error, user] = await userModel.login(email, password);

        if (user) {
            //creating a jwt token
            const token = createToken(user._id);
            const email = user.email;

            const userDetails = {
                "name": user.name,
                "rollNo": user.rollNo,
                "phoneNo": user.phoneNo,
                "hostel": user.hostel
            }

            res.status(200).json({ "user": { email, token }, "userDetails": userDetails });
        }
        else {
            res.status(400).json(error);
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default loginUser;