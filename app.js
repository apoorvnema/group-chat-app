const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
dotenv.config();
app.use(cors({
    origin: ["https://group-chat-app.apoorvnema.pro/"]
}));

const messages = require("./routes/messages");
const user = require("./routes/user");
const contact = require("./routes/contact");
const groups = require("./routes/groups");
const error = require("./controllers/error");
const database = require("./utils/database");
const User = require("./models/users");
const Message = require("./models/messages");
const Group = require("./models/groups");
const GroupMember = require("./models/groupMember");

app.use(messages);
app.use(user);
app.use(contact);
app.use(groups);

app.use(error.error404);

User.hasMany(Message);
Message.belongsTo(User);

Group.belongsToMany(User, { through: GroupMember });
User.belongsToMany(Group, { through: GroupMember });
Group.hasMany(Message);
Message.belongsTo(Group);

database
    .sync()
    // .sync({ force: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
        console.log("Database connected");
    }).catch(err => console.error(err));