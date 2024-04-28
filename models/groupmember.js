const { DataTypes } = require("sequelize");

const database = require("../utils/database");

const GroupMember = database.define('GroupMember', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

module.exports = GroupMember;