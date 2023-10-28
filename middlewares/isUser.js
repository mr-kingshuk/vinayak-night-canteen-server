import jwt from 'jsonwebtoken';
import { userModel } from '../models/Users/Users.js';

const requireAuth = async (req, res, next) => {

    //verify authorization, token sent via headers from frontend
    const {authorization} = req.headers;
    
    if(!authorization)
        return res.status(401).json({error : 'Authorization token required'}); 

    //authorization is equal to 'Bearer jfhlsdfhlsdf.gjdskgdsjhds.hjdgsjsdkhds'
    const token = authorization.split(' ')[1];

    //verify the authorization token
    try{
        const {_id} = jwt.verify(token, process.env.SECRET);
        req.user = await  userModel.findOne({_id}).select('_id');
        next();
    }
    catch(error){
        res.status(401).json({error: 'Request is not authorized'})
    }

}

export default requireAuth;