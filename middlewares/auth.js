const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send('Unauthorized: No token provided');
        console.error(err);
    }
}

module.exports = authenticate;