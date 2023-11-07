import mongoose from "mongoose";
import { userModel } from "./Users.js";

const userTypeSchema = new mongoose.Schema({
    userId : {
        type:  mongoose.SchemaTypes.ObjectId,
        ref : userModel,
        required: true,
    },
    type : {
        type: String,
        required: true
    }
});

export const userTypeModel = mongoose.model('userTypes', userTypeSchema);