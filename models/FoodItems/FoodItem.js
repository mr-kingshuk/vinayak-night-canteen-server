import mongoose from "mongoose";
import { categoryModel } from "./Category.js";

const itemSchema = new mongoose.Schema({
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
        ref : categoryModel,
        required: true,
    },
    isAvailable : {
        type: Boolean,
        required: true
    }
});

export const itemModel = mongoose.model('Item', itemSchema);