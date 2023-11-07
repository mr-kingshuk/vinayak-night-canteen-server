import mongoose from "mongoose";
import { itemModel } from "../../models/FoodItems/FoodItem.js";
import { categoryModel } from "../../models/FoodItems/Category.js";

const deleteCategory = async (req, res) => {
    const { _id } = new mongoose.Types.ObjectId(req.params);
    try {
        const deletedCategory = await categoryModel.findOneAndDelete({_id : _id});
        if(deletedCategory){
            const deletedItems = await itemModel.find({ categoryId : deletedCategory._id});
            const deleteItems = await itemModel.deleteMany({ categoryId : deletedCategory._id});
            return res.status(200).json({category : deletedCategory,items: deletedItems});    
        }
        return res.status(404).json({"err" : "Category doesn't exist"});
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

export default deleteCategory;