const path = require("path");
const fs = require("fs");

const Message = require("../models/messagesModel");
const rootDir = require("../util/path");

exports.getMessages = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'message.html'));
};

exports.postMessages = (req, res) => {
    const message = new Message(req.body.message);
    message.save();
    res.redirect('/');
}

exports.allMessages = (req, res) => {
    Message.fetchAll((messages) => {
        res.json(messages);
    });
};