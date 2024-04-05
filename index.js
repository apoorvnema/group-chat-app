const express = require("express");
const bodyParser = require("body-parser");

const messages = require("./routes/messages");
const login = require("./routes/login");
const contact = require("./routes/contact");
const errorController = require("./controllers/errorController");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use(messages);
app.use(login);
app.use(contact);

app.use(errorController.error404);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});