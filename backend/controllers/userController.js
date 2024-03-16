const Functions_MONGO = require('../functions/userFunctions');


const userController = {};


userController.handleLogin = async (req, res) => {
    const { user, password } = req.body;

    try {
        const response_MONGO = await Functions_MONGO.HANDLELOGIN(user, password);
        res.status(200).json(response_MONGO);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




module.exports = userController;