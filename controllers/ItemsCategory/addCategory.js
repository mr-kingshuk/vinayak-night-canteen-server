import { categoryModel } from "../../models/FoodItems/Category.js";

//Converts string to Title Case
function toTitleCase(str) {
    return str
        .toLowerCase() // Convert the string to lowercase to handle mixed cases
        .split(' ') // Split the string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the words back into a single string with spaces between them
}


const addCategory = async (req, res) => {
    const { name } = req.body;
    
    if (!name)
        return res.status(400).json({ "err": "Please provide a Category Name" });

    const updatedName = toTitleCase(name);
    try {
        const category = await categoryModel.create({ name : updatedName });
        return res.status(200).json(category);
    }
    catch (err) {
        return res.status(500).json({ "err": "Server Error!!" });
    }
};

export default addCategory;