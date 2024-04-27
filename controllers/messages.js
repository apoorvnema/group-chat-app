const path = require("path");

const rootDir = require("../utils/path");
const Message = require("../models/messagesModel");

exports.getMessages = (req, res, next) => {
    res.sendFile(path.join(rootDir, "public", "messages.html"));
}

exports.postMessages = (req, res, next) => {
    const message = new Message(req.body);
    message.save();
    res.redirect("/");
}

exports.getAllMessages = (req, res, next) => {
    Message.fetchAll((messages) => {
        res.json(messages);
    });
}