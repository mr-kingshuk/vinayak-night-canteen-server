
const deleteWorker = (req, res) => {
    const { userID } = req.params;
    res.status(200).json({message:"downgrades an worker to user status"});
};

export default deleteWorker;