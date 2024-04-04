const path = require("path");
const fs = require("fs");

const Message = require("../models/messagesModel");
const rootDir = require("../util/path");

exports.getMessages = (req, res) => {
    // Message.fetchAll((messages) => {
    //     res.render('index', {
    //         pageTitle: 'Home',
    //         messages: messages
    //     });
    // });
    res.sendFile(path.join(rootDir, 'views', 'message.html'));
};

exports.postMessages = (req, res) => {
    const message = new Message(req.body.message);
    message.save();
    res.redirect('/');
    // const message = req.body.message + '\n';
    // fs.appendFileSync('message.txt', message);
}