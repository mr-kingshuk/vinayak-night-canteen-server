import mongoose from "mongoose";
import { itemModel } from "../../models/FoodItems/FoodItem.js";

const deleteItem = async (req, res) => {
    const { _id } = new mongoose.Types.ObjectId(req.params);
    try {
        const deletedItem = await itemModel.findOneAndDelete({_id : _id});
        if(deletedItem)
            return res.status(200).json(deletedItem);    
        return res.status(404).json({"err" : "Item doesn't exist"});
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

export default deleteItem;