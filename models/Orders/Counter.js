import mongoose from 'mongoose';
import increment from './Increment.js';

const counterSchema = new mongoose.Schema({
    sequence_value: {
        type: Number, 
        default: 0 
    }, 
});

counterSchema.statics.increment = increment;
export const counter = mongoose.model('Counter', counterSchema);