const path = require('path');

const rootDir = require('../utils/path');

exports.postContact = (req, res) => {
    res.sendFile(path.join(rootDir, 'public', 'success.html'));
}