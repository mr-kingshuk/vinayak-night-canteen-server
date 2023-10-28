import mongoose from "mongoose";

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
        required: true,
    },
    isAvailable : {
        type: Boolean,
        required: true
    }
});

export const itemModel = mongoose.model('Item', itemSchema);