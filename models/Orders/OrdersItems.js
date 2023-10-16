import mongoose from "mongoose";

const OrdersItemSchema = new mongoose.Schema({
    orderId : {
        type:  mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    foodItemId : {
        type:  mongoose.SchemaTypes.ObjectId,
        required: true
    },
    quantity : {
        type : Number,
        required : true
    }
});

export const OrdersItemModel = mongoose.model('OrdersItem', OrdersItemSchema);