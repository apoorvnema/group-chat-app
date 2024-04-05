const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

module.exports = class Message {
    constructor(message) {
        this.message = message;
    }
    save() {
        fs.readFile(path.join(rootDir, "/data", "messages.json"), (err, data) => {
            let messages = [];
            if (!err) {
                messages = JSON.parse(data);
            }
            messages.push(this.message);
            fs.writeFile(path.join(rootDir, "/data", "messages.json"), JSON.stringify(messages), (err) => {
                if (err) {
                    console.error("Error appending data to file:", err);
                } else {
                    console.log("Data appended successfully.");
                }
            });
        })
    }
    static fetchAll(callback) {
        fs.readFile(path.join(rootDir, "/data", "messages.json"), (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                callback(err);
            } else {
                const messages = JSON.parse(data);
                callback(messages);
            }
        });
    }

}