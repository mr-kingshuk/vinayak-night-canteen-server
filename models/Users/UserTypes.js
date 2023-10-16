import mongoose from "mongoose";

const userTypeSchema = new mongoose.Schema({
    userId : {
        type:  mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    userType : {
        type: String,
        required: true
    }
});

export const userTypeModel = mongoose.model('UserType', userTypeSchema);