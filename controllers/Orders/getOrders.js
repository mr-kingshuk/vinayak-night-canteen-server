import mongoose from "mongoose";
import { ordersModel } from "../../models/Orders/Orders.js";

const getOrders = async (req, res) => {
    const { _id } = new mongoose.Types.ObjectId(req.user);
    try{
        const orders = await ordersModel.find({ userId : _id }).sort({ createdAt: -1 });
        if(orders){
            return res.status(200).json(orders);
        } 
        else{
            return res.status(404).json({"err" : "No orders Found"});
        }
    }
    catch(err){
        return res.status(500).json({err});
    }
};

export default getOrders;