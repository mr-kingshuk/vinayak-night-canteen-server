import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { userTypeModel } from '../models/Users/UserTypes.js';

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

        const ObjectId = mongoose.Types.ObjectId;
        const id = new ObjectId(_id);

        const worker = await userTypeModel.findOne({userId : id});
        if(worker.type === "worker")
            req.user = worker.userId;
        else
            return res.status(401).json({error: 'Only Worker Profile is Authorized.'})    
        next();
    }
    catch(error){
        return res.status(401).json({error: 'Request is not authorized'})
    }

}

export default requireAuth;