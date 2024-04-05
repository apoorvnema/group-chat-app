const path = require('path');

const rootDir = require('../utils/path');

exports.getLogin = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'login.html'));
};