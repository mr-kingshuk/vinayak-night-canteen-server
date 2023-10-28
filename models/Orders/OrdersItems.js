import mongoose from "mongoose";

const OrdersItemSchema = new mongoose.Schema({
    orderId : {
        type:  mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    itemId : {
        type:  mongoose.SchemaTypes.ObjectId,
        required: true
    },
    quantity : {
        type : Number,
        required : true
    },
    original_order_item_id : {
        type:  mongoose.SchemaTypes.ObjectId
    }
});

export const ordersItemModel = mongoose.model('OrdersItem', OrdersItemSchema);