const User = require("../models/users");
const GroupMember = require("../models/groupMember");
const Message = require("../models/messages");
const Group = require("../models/groups");
const database = require("../utils/database")

exports.createGroup = async (io, socket, groupData) => {
    const t = await database.transaction();
    try {
        const group = await Group.create({
            name: groupData.name,
        }, { transaction: t });
        await group.addUser(socket.user, { through: { admin: true }, transaction: t });
        for (const member of groupData.members) {
            const user = await User.findOne({ where: { email: member } });
            if (!user) {
                throw new Error("User not found");
            }
            await group.addUser(user, { transaction: t });
        }
        await t.commit();
        io.emit("group-created", group);
    } catch (err) {
        if (err.message == "User not found") {
            socket.emit("user-not-found");
        }
        await t.rollback();
    }
}

exports.getAllGroups = async (socket, cb) => {
    try {
        const UserId = socket.user.id;
        const user = await User.findByPk(UserId);
        const groups = await user.getGroups();
        return cb(groups);
    }
    catch (err) {
        console.error(err);
    }
}

exports.getGroupMessages = async (socket, groupId) => {
    try {
        const userId = socket.user.id;
        const groupMember = await GroupMember.findOne({ where: { groupId: groupId, userId: userId } });
        if (!groupMember) {
            socket.emit("not-member");
        }
        const messages = await Message.findAll({ where: { groupId: groupId } });
        messages.map(message => {
            if (socket.user.name == message.sender) {
                return message.sender = `You`;
            }
            else {
                return message.sender;
            }
        });
        socket.emit("get-group-messages", messages);
    }
    catch (err) {
        console.error(err);
    }
}

exports.getGroupMembers = async (socket, groupId) => {
    try {
        const userId = socket.user.id;
        const groupMember = await GroupMember.findOne({ where: { groupId: groupId, userId: userId } });
        if (!groupMember) {
            socket.emit("not-member");
            return;
        }
        const group = await Group.findByPk(groupId);
        const admin = groupMember.admin;
        const memberList = await group.getUsers();
        const idAndNames = memberList.reduce((acc, user) => {
            if (socket.user.name != user.name) {
                acc[user.id] = user.name;
            }
            else {
                acc[user.id] = `You`;
            }
            return acc;
        }, {});
        const emails = memberList.map(user => {
            if (user.email != socket.user.email)
                return user.email;
        });
        socket.emit("group-members", idAndNames, admin, emails);
    }
    catch (err) {
        console.error(err);
    }
}

exports.postMessages = async (socket, message, groupId) => {
    const { name, id } = socket.user;
    const t = await database.transaction();
    try {
        await Message.create({ message: message, sender: name, UserId: id, GroupId: groupId });
        await t.commit();
        socket.to(groupId).emit("post-group-message", { message: message, sender: name, userId: id });
    } catch (error) {
        console.error(error.message);
        await t.rollback();
    }
};