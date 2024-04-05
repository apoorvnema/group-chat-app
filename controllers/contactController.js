const path = require('path');

const rootDir = require('../utils/path');

exports.getContact = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'contact.html'));
}

exports.postContact = (req, res) => {
    console.log(req.body);
    res.sendFile(path.join(rootDir, 'views', 'success.html'));
}