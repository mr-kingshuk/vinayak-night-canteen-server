import mongoose from 'mongoose';

import { counter } from "../../models/Orders/Counter.js";
import { ordersModel } from "../../models/Orders/Orders.js";
import { ordersItemModel } from "../../models/Orders/OrdersItems.js";
import { userModel } from "../../models/Users/Users.js";

import { itemModel } from "../../models/FoodItems/FoodItem.js";

const addOrder = async (req, res) => {
    const { _id } = req.user;
    const status = "Accepted";
    const { order } = req.body;
    var check;

    try {
        await Promise.all(order.map(async (orderItem) => {
            const item = await itemModel.findById(orderItem._id);
            if (!item.isAvailable) {
              check = true;
            }
        }));

        if(check){
            return res.status(400).json({"err" : "One or many items have become unavailable. Please order again!!"});
        }

        const orderNumber = await counter.increment();
        
        const hostel = await userModel.findOne(
            { _id: new mongoose.Types.ObjectId(_id) }, 
            { _id: 0, hostel: 1 }
        );
        const orderDocRef = await ordersModel.create({
            userId: _id,
            status: status,
            orderNumber: orderNumber,
            hostel: hostel.hostel
        });
        const orderId = orderDocRef.id;

        const orderDetailPromises = order.map(async (detail) => {
            const orderDetail = await ordersItemModel.create({
                orderId: orderId,
                itemName: detail.name,
                itemPrice: detail.price,
                quantity: detail.quantity,
            });
        });
        await Promise.all(orderDetailPromises);

        return res.status(200).json(orderDocRef);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

export default addOrder;