const { DataTypes } = require("sequelize");

const database = require("../utils/database");

const Archived = database.define("Archived", {
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Archived;