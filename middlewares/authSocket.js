const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authenticateSocket = async (socket, next) => {
    try {
        const { token } = socket.handshake.auth;
        if (!token) {
            throw new Error('Authentication token missing');
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new Error("Invalid token");
        }
        socket.user = user;
        next();
    } catch (error) {
        socket.emit("auth-error");
    }
};

module.exports = authenticateSocket;
