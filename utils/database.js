const Sequelize = require('sequelize');
require('dotenv').config();

const database = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false
});

module.exports = database;