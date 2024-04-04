const path = require("path");

const rootDir = require("../util/path");

exports.error404 = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', '404.html'));
};