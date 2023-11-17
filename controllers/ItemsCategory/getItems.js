import { itemModel } from "../../models/FoodItems/FoodItem.js";
import { categoryModel } from "../../models/FoodItems/Category.js";

const getItems = async (req, res) => {
    try{
        const category = await categoryModel.find();
        const items = await itemModel.find();
        return res.status(200).json({ category, items });
    }
    catch(err){
        return res.status(500).json({ err });
    } 
};

export default getItems;