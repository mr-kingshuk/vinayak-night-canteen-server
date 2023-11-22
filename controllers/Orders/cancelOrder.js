import mongoose from "mongoose";
import { ordersModel } from "../../models/Orders/Orders.js";

const cancelOrder = async (req, res) => {
    const { id } = req.params; 
    try{
        const updatedOrder = await ordersModel.findOneAndUpdate(
            { _id : id },
            {$set: { status: 'Cancelled' }},
            { new: true }
        );
        if(!updatedOrder)
            return res.status(404).json({err: "No Order Found."})    
        return res.status(200).json(updatedOrder);
    }
    catch(err){
        return res.status(500).json({err});
    }
};

export default cancelOrder;