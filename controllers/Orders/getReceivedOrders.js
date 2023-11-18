import { ordersModel } from "../../models/Orders/Orders.js";

const getReceivedOrders = async (req, res) => {
    try{
        const orders = await ordersModel.find({status : "Accepted"}).populate('userId').sort({ createdAt : -1});
        return res.status(200).json(orders);
    }
    catch(err){
        return res.status(500).json({err});
    }
};

export default getReceivedOrders;