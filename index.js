const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const loginRoutes = require("./routes/login");
const messageRoutes = require("./routes/message");
const contactRoutes = require("./routes/contact");
const errorController = require("./controllers/errorController");
const rootDir = require('./util/path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use(loginRoutes);
app.use(messageRoutes);
app.use(contactRoutes);

app.use(errorController.error404);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})