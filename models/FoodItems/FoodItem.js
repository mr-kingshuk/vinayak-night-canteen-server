import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    price : {
        type: Number,
        required : true
    },
    categoryID : {
        type:  mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    isAvailable : {
        type: Boolean,
        required: true
    }
});

export const FoodItemModel = mongoose.model('FoodItem', foodItemSchema);