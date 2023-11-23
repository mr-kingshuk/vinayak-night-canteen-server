import mongoose from 'mongoose';
import increment from './Increment.js';
import reset from './Reset.js';

const counterSchema = new mongoose.Schema({
    sequence_value: {
        type: Number, 
        default: 0 
    }, 
});

counterSchema.statics.increment = increment;
counterSchema.statics.reset = reset;
export const counter = mongoose.model('Counter', counterSchema);