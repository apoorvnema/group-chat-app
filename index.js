const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const loginRoutes = require("./routes/login");
const messageRoutes = require("./routes/message");
const contactRoutes = require("./routes/contact");
const rootDir = require('./util/path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use(loginRoutes);
app.use(messageRoutes);
app.use(contactRoutes);

app.use((req, res) => {
    res.sendFile(path.join(rootDir, 'views', '404.html'));
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})