import { userTypeModel } from '../../models/Users/UserTypes.js';
import { userModel } from '../../models/Users/Users.js';

const addWorker = async (req, res) => {
    const { email } = req.body;

    if(!email)
        return res.status(404).json({"msg" : 'Please enter an email address'});

    try {
        const user = await userModel.findOne({ email: email }, '_id');

        if (user) {
            const userId = user._id;
            const userTypeExists = await userTypeModel.find({ userId });
            if(userTypeExists.length > 0)
                return res.status(404).json({"msg" : 'User is already a worker'});
                
            const userType = await (await userTypeModel.create({ userId, type: 'worker' })).populate('userId');     
            return res.status(200).json(userType);
        } else {
            return res.status(404).json({"msg" : 'User not found, please tell worker to create account'});
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};

export default addWorker;