import mongoose from "mongoose";

const storeTimingSchema = new mongoose.Schema({
    openHour : {
        type:  Number,
        required: true,
    },
    openMin : {
        type:  Number,
        required: true,
    },
    closeHour : {
        type:  Number,
        required: true,
    },
    closeMin : {
        type:  Number,
        required: true,
    },
});

export const storeTimingModel = mongoose.model('storeTiming', storeTimingSchema); 