const { DataTypes } = require("sequelize");

const database = require("../utils/database");

const Group = database.define("Group", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Group;