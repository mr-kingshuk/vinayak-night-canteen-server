
const addWorker = (req, res) => {
    console.log(req.user);
    res.status(200).json({message : "upgrades a user to worker status"})
};

export default addWorker;