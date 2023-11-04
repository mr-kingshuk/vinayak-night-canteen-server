import { userModel } from "../../models/Users/Users.js";

//Converts string to Title Case
function toTitleCase(str) {
    return str
      .toLowerCase() // Convert the string to lowercase to handle mixed cases
      .split(' ') // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the words back into a single string with spaces between them
  }

const updateUser = async (req, res) => {
    const { _id } = req.user;
    const update = req.body;

    const fields = [];
    if (!update["name"])
        fields.push("name");
    if (!update["phoneNo"])
        fields.push("phoneNo");
    if (!update["rollNo"])
        fields.push("rollNo");
    if (!update["hostel"])
        fields.push("hostel");
    
    if( fields.length > 0)
        return res.status(401).json({fields, message: "All fields must be filled"});

    update.phoneNo = update.phoneNo.replace(/\s/g, '');    
    const regex = /^\S{10}$/;
    if(!regex.test(update.phoneNo)){
        fields.push("phoneNo");
        return res.status(401).json({fields, message: "Enter 10 digit number"});
    }
    update.name = toTitleCase(update.name);
    update.rollNo = update.rollNo.toUpperCase(); 

    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { _id },
            { $set: update },
            { new: true, projection: { name: 1, rollNo: 1, phoneNo: 1, hostel: 1 } }
        );
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(400).json({ error });
    }
};

export default updateUser;