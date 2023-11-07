import mongoose from 'mongoose';
import { userTypeModel } from '../../models/Users/UserTypes.js';

const deleteWorker = async (req, res) => {
    const { _id } = new mongoose.Types.ObjectId(req.params);
    try {
        const deletedDoc = await userTypeModel.findOneAndDelete({userId : _id});
        if (deletedDoc) {
            return res.status(200).json({ '_id': deletedDoc.userId });
        } else {
            return res.status(400).json({ 'err': "Didn't find a document" });
        }
    } catch (err) {
        return res.status(500).json({ 'err': "Server Error" });
    }
};

export default deleteWorker;