import { userTypeModel } from '../../models/Users/UserTypes.js';

const getWorkers = async (req, res) => {
    const users = await userTypeModel.find({type : "worker"}).populate('userId');
    if(users)
        return res.status(200).json(users);
    else
        return res.status(400).json({ "err" : "No users found"});    
};

export default getWorkers;