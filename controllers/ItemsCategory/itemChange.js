import mongoose from "mongoose";
import { itemModel } from "../../models/FoodItems/FoodItem.js";

const itemChange = async (req, res) => {
    const { _id } = new mongoose.Types.ObjectId(req.params);
    try{
        const item = await itemModel.find({_id});
        if(item.length === 0)
            return res.status(404).json({"err" : "Item not found"});

        const available = item[0].isAvailable ? false : true; 
        const itemUpdated = await itemModel.findOneAndUpdate(
            { _id },
            { $set: { isAvailable : available } },
            { new: true, projection: { isAvailable : 1 } }
        );
        res.status(200).json(itemUpdated);
    }
    catch(err){
        res.status(500).json({err});
    }
};

export default itemChange;