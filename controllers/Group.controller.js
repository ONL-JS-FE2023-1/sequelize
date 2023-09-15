const { Group } = require('../models');

module.exports.createGroup = async (req, res, next) => {
    try {
        const { body } = req;
        const createdGroup = await Group.create(body);
        return res.status(201).send(createdGroup);
    } catch (error) {
        next(error);
    }
}

// Задача: написати контроллер на додавання юзера у групу
module.exports.addUserToGroup = async (req, res, next) => {
    try {
        const {userInstance, params: {groupId}} = req;
        const group = await Group.findByPk(groupId);
        const result = await group.addUser(userInstance);
        return res.status(200).send('User successfully added to group');
    } catch (error) {
        next(error);
    }
}