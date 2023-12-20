import { userModel } from "../../models/Users/Users.js";

const verifyLink = async (req, res) =>{
    res.status(200).json({"reset-password": "verififies and redirects to page"});
};

export default verifyLink;