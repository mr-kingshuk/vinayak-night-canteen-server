import mongoose from "mongoose";

const OrdersItemSchema = new mongoose.Schema({
    itemName : {
        type:  String,
        required: true, 
    },
    itemPrice:{
        type: Number, 
        required: true
    },
    orderId : {
        type:  mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    quantity : {
        type : Number,
        required : true
    }
});

export const ordersItemModel = mongoose.model('OrdersItem', OrdersItemSchema);