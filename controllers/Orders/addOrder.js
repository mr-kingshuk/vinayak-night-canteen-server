import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
import Razorpay from 'razorpay';

import { counter } from "../../models/Orders/Counter.js";
import { ordersModel } from "../../models/Orders/Orders.js";
import { ordersItemModel } from "../../models/Orders/OrdersItems.js";
import { userModel } from "../../models/Users/Users.js";

import { itemModel } from "../../models/FoodItems/FoodItem.js";

const addOrder = async (req, res) => {
    // const instance = new Razorpay({
    //     key_id: process.env.RAZORPAY_ID_KEY,
    //     key_secret: process.env.RAZORPAY_SECRET_KEY,
    // });
    const { _id } = req.user;
    const status = "Accepted";
    const { order } = req.body;
    var check;

    try {
        await Promise.all(order.map(async (orderItem) => {
            // console.log(orderItem._id);
            const item = await itemModel.findById(orderItem._id);
            if (!item.isAvailable) {
                check = true;
            }
        }));

        if (check) {
            // console.log(check);
            return res.status(400).json({ "err": "One or many items have become unavailable. Please order again!!" });
        }

        const orderNumber = await counter.increment();
        const hostel = await userModel.findOne(
            { _id: new mongoose.Types.ObjectId(_id) },
            { _id: 0, hostel: 1 }
        );
        let total = 0;
        const totalPrice = order.map((detail) => {
            total = total + detail.price * detail.quantity;
        });
        total = total * 100;

        // console.log(instance);
        console.log(total);

        //Razorpay Code
        // const options = {
        //     amount: total,  // amount in the smallest currency unit
        //     currency: "INR"
        // };
        // const order = await instance.orders.create(options);

        // console.log(order);


        const orderDocRef = await ordersModel.create({
            userId: _id,
            status: status,
            orderNumber: orderNumber,
            hostel: hostel.hostel,
            razorpayOrderId: "king",
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