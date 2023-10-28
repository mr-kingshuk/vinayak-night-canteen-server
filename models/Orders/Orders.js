import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
    userId : {
        type:  mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    status : {
        type: String,
        required: true
    }
}, { timestamps : true});

export const ordersModel = mongoose.model('Orders', OrdersSchema);