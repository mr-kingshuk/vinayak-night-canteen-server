import mongoose from "mongoose";

const userTypeSchema = new mongoose.Schema({
    userId : {
        type:  mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    type : {
        type: String,
        required: true
    }
});

export const userTypeModel = mongoose.model('userTypes', userTypeSchema);