const GroupMember = require("../models/groupMember");
const User = require("../models/users");
const Group = require("../models/groups");
const database = require("../utils/database");

exports.deleteGroup = async (req, res, next) => {
    const t = await database.transaction();
    try {
        const groupId = req.params.groupId;
        const group = await Group.findByPk(groupId);
        const adminUser = await group.getUsers({
            where: { id: req.user.id },
            through: { where: { admin: true } }
        });
        if (adminUser.length == 0 || adminUser[0].id != req.user.id) {
            return res.status(401).json({ error: 'You are not admin' });
        }
        await group.destroy({ transaction: t });
        await t.commit();
        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (err) {
        await t.rollback();
        console.error(err.errors[0].message);
        res.status(500).json({ error: err.errors[0].message });
    }
}

exports.editGroup = async (req, res, next) => {
    const t = await database.transaction();
    try {
        const groupId = req.params.groupId;
        const group = await Group.findByPk(groupId);
        const adminUser = await group.getUsers({
            where: { id: req.user.id },
            through: { where: { admin: true } }
        });
        if (adminUser.length == 0 || adminUser[0].id != req.user.id) {
            return res.status(401).json({ error: 'You are not admin' });
        }
        group.name = req.body.name;
        await group.save({ transaction: t });
        const members = req.body.members;
        for (const member of members) {
            const user = await User.findOne({ where: { email: member } });
            if (!user) {
                await t.rollback();
                return res.status(500).json({ error: `User with email ${member} not found` });
            }
            await group.addUser(user, { transaction: t });
        }
        await t.commit();
        res.status(200).json({ message: 'Group edited successfully' });
    } catch (err) {
        await t.rollback();
        console.error(err.errors[0].message);
        res.status(500).json({ error: err.errors[0].message });
    }
}

exports.deleteMember = async (req, res, next) => {
    try {
        const groupId = req.params.groupId;
        const userId = req.params.userId;
        const group = await Group.findByPk(groupId);
        const adminUser = await group.getUsers({
            where: { id: req.user.id },
            through: { where: { admin: true } }
        });
        if (adminUser.length == 0 || adminUser[0].id != req.user.id) {
            return res.status(401).json({ error: 'You are not admin' });
        }
        await GroupMember.destroy({ where: { groupId: groupId, userId: userId } });
        res.status(200).json({ message: 'Member deleted successfully' });
    } catch (err) {
        console.error(err.errors[0].message);
        res.status(500).json({ error: err.errors[0].message });
    }
}

exports.makeAdmin = async (req, res, next) => {
    try {
        const groupId = req.params.groupId;
        const userId = req.params.userId;
        const group = await Group.findByPk(groupId);
        const adminUser = await group.getUsers({
            where: { id: req.user.id },
            through: { where: { admin: true } }
        });
        if (adminUser.length == 0 || adminUser[0].id != req.user.id) {
            return res.status(401).json({ error: 'You are not admin' });
        }
        await GroupMember.update({ admin: true }, { where: { groupId: groupId, userId: userId } });
        res.status(200).json({ message: 'Member made admin successfully' });
    } catch (err) {
        console.error(err.errors[0].message);
        res.status(500).json({ error: err.errors[0].message });
    }
}