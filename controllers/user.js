const path = require('path');
const rootDir = require('../utils/path');
const bcrypt = require('bcrypt');

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