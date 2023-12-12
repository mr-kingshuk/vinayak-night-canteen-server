import mongoose from 'mongoose';
import { ordersModel } from "../../models/Orders/Orders.js";
import { ordersItemModel } from "../../models/Orders/OrdersItems.js";

const getOrder = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({"err" : "Not Valid OrderId"})
    }
    const orderId =  new mongoose.Types.ObjectId(id);

    try{
        const order = await ordersModel.findById(orderId).populate('userId');
        if(order && order.paymentStatus){
            const items = await ordersItemModel.find({orderId : orderId});
            const body = { order : order, items : items};
            return res.status(200).json(body);
        }
        else{
            return res.status(404).json({"err" : "Order Not Found"});
        }
    }
    catch(err){
        return res.status(500).json({err});
    }
};

export default getOrder;