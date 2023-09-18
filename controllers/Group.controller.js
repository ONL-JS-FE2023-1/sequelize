const UserNotFound = require('../errors/UserNotFound');
const { Group, User } = require('../models');

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

// Задача: отримати певного юзера з всіма групами, в яких він перебуває
module.exports.getUserGroups = async (req, res, next) => {
    try {
        // +1 дія: отримуємо сутність юзера
        const { userInstance } = req;
        // 2 дія: викликаємо магічний метод у сутності юзера
        const groups = await userInstance.getGroups();
        // 3 дія: відправляємо результат клієнту
        return res.status(200).send(groups);
    } catch (error) {
        next(error);
    }
}

// Задача: написати контроллер на видалення юзера з групи
module.exports.deleteUserFromGroup = async (req, res, next) => {
    try {
        const {userInstance, params: {groupId}} = req;
        // 1. Знайти сутність групи
        const groupInstance = await Group.findByPk(groupId);
        // 2. Видалення юзера
        const rowCount = await groupInstance.removeUser(userInstance);

        if(rowCount) {
            return res.status(200).send('User succesfully deleted');
        }
        return res.status(200).send('User is never been in this group');
    } catch (error) {
        next(error);
    }
}