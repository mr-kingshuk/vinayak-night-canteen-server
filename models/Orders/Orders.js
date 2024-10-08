import mongoose from "mongoose";
import { userModel } from "../Users/Users.js";

//Accepted, Delivered, Cancelled
const OrdersSchema = new mongoose.Schema({
    userId : {
        type:  mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: userModel
    },
    razorpayOrderId : {
        type:  String,
        required: true,
    },
    razorpayPaymentId : {
        type:  String,
    },
    paymentStatus : {
        type: Boolean,
        required: true
    },
    status : {
        type: String,
        required: true
    },
    orderNumber :{
        type: Number,
        required: true
    },
    hostel : {
        type: String, 
        required: true
    },
}, { timestamps : true});

export const ordersModel = mongoose.model('Orders', OrdersSchema);