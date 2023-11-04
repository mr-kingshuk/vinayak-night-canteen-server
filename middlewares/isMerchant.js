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

        const merchant = await userTypeModel.findOne({userId : id});

        if(merchant.type === 'merchant')
            req.user = merchant.userId; 
        else    
          return res.status(401).json({error: 'Only Merchant Profile is Authorized.'})            
        next();
    }
    catch(error){
        return res.status(401).json({error: 'Request is not authorized'})
    }

}

export default requireAuth;