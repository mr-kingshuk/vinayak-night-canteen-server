import { categoryModel } from "../../models/FoodItems/Category.js";
import { itemModel } from "../../models/FoodItems/FoodItem.js";

//Converts string to Title Case
function toTitleCase(str) {
    return str
        .toLowerCase() // Convert the string to lowercase to handle mixed cases
        .split(' ') // Split the string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the words back into a single string with spaces between them
}

const addItem = async (req, res) => {
    const { name, price } = req.body;
    const { categoryId } = (req.params);

    if (!name || !price)
        return res.status(400).json({ "err": "Please fill all fields" })

    const nameCase = toTitleCase(name);
    try {

        const categoryIsExists = await categoryModel.find({ _id: categoryId });
        if (categoryIsExists.length === 0)
            return res.status(404).json({ "err": "Category doesn't exists" })

        const item = await itemModel.create({ name: nameCase , price, categoryId, isAvailable: true });
        return res.status(200).json(item);
    }
    catch (err) {
        return res.status(500).json({ "err": "Server Error" });
    }

};

export default addItem;