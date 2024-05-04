const sequelize = require("sequelize");

const Message = require("../models/messages");
const Archived = require("../models/archived");

exports.archiveOldMessages = async () => {
    try {
        console.log('Archiving old messages...');
        const thresholdDate = new Date();
        thresholdDate.setDate(thresholdDate.getDate() - 1);
        const oldMessages = await Message.findAll({
            where: {
                updatedAt: { [sequelize.Op.lt]: thresholdDate }
            }
        });

        await Archived.bulkCreate(oldMessages.map(msg => msg.toJSON()));

        await Message.destroy({
            where: {
                updatedAt: { [sequelize.Op.lt]: thresholdDate }
            }
        });
        console.log(`${oldMessages.length} old messages archived and deleted.`);
    } catch (error) {
        console.error('Error archiving old messages:', error);
    }
}