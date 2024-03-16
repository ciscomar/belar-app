const auth = {}
const jwt = require('jsonwebtoken')
const userFunctions = require('../functions/userFunctions')


auth.handleLogin = async (req, res) => {
    const { user, password } = req.body;

    try {
        const foundUser = await userFunctions.handleLogin(user, password);
        if (foundUser == null) {return res.status(401).json({ authorization: "Unauthorized" });}
        const data = {
            user: foundUser.name,
            password: foundUser.password,
          };

        const accessToken = jwt.sign(data, process.env.SECRET, { expiresIn: '1d' });

        res.cookie('dermadel', accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        return res.status(200).json({
            data: foundUser,
            authorization: "Authorized"
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


auth.handleRoutes = (req, res, next) => {
    const token = req.cookies['belar'];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized" });
    }
};
module.exports = auth