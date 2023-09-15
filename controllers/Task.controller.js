const {Task, User} = require('../models');

module.exports.createTask = async (req, res, next) => {
    try {
        const {userInstance, body} = req;
        const result = await userInstance.createTask(body);
        return res.status(201).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.getAllUserTasks = async (req, res, next) => {
    try {
        const {userInstance} = req;
        const tasks = await userInstance.getTasks();
        return res.status(200).send(tasks);
    } catch (error) {
        next(error);
    }
}

// Задача: знайти кількість завдань юзера за id юзера
module.exports.getCountOfTasks = async (req, res, next) => {
    try {
        const {userInstance} = req;
        const tasksCount = await userInstance.countTasks();
        return res.status(200).send(`${tasksCount}`);
    } catch (error) {
        next(error);
    }
}