const path = require('path');
const rootDir = require('../utils/path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const database = require('../utils/database');

exports.getSignup = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'public', 'signup.html'));
};

exports.postSignup = async (req, res, next) => {
    const t = await database.transaction();
    try {
        const { name, email, phone, password } = req.body;
        const modifiedPassword = await bcrypt.hash(password, 10);
        await User.create({ name: name, email: email, phone: phone, password: modifiedPassword });
        await t.commit();
        res.status(200).send({ message: 'User created successfully' });
    }
    catch (err) {
        console.log(err.errors[0].message);
        await t.rollback();
        res.status(500).send({ error: err.errors[0].message });
    }
};

exports.getLogin = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'public', 'login.html'));
};

function generateAccessToken(id, email) {
    return jwt.sign({ id: id, email: email }, process.env.ACCESS_TOKEN_SECRET);
}

exports.postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }
        res.status(200).send({ message: 'User successfully Logged In', token: generateAccessToken(user.id, user.email) });
    }
    catch (err) {
        if (err.statusCode != 500) {
            res.status(err.statusCode).send({ error: err.message });
        }
        else {
            console.log(err);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
};