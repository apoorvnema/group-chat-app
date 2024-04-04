const fs = require('fs');
const path = require('path');

module.exports = class Message {
    constructor(message) {
        this.message = message;
    }

    save() {
        const p = path.join(
            path.dirname(require.main.filename),
            'data',
            'messages.json'
        );
        fs.readFile(p, (err, fileContent) => {
            let messages = [];
            if (!err) {
                messages = JSON.parse(fileContent);
            }
            messages.push(this);
            fs.writeFile(p, JSON.stringify(messages), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        const p = path.join(
            path.dirname(require.main.filename),
            'data',
            'messages.json'
        );
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });
    }
};
