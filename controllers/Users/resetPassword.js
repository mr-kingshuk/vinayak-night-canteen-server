const resetPassword = (req, res) => {
    console.log(req.user);
    res.status(200).json({"msg" :"resetpassword"})
};

export default resetPassword