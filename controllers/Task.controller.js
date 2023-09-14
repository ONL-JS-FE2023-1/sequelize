const {Task, User} = require('../models');

module.exports.createTask = async (req, res, next) => {
    try {
        // 1. Витягуємо з параметрів запиту id юзера і body http-запиту
        const {params: {userId}, body} = req;
        // 2. Знаходимо єкземпляр сутності
        const user = await User.findByPk(userId);
        // 3. Використовуємо магічні методи єкземпляру сутності
        const result = await user.createTask(body);
        return res.status(201).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.getAllUserTasks = async (req, res, next) => {
    try {
        // 1. Витягуємо з параметрів запиту id юзера
        const {params: {userId}} = req;
        // 2. Знаходимо єкземпляр сутності
        const user = await User.findByPk(userId);
        // 3. Використовуємо магічні методи єкземпляру сутності
        const tasks = await user.getTasks();
        return res.status(200).send(tasks);
    } catch (error) {
        next(error);
    }
}

// Задача: знайти кількість завдань юзера за id юзера
module.exports.getCountOfTasks = async (req, res, next) => {
    try {
        // 1. Витягуємо з параметрів запиту id юзера
        const {params: {userId}} = req;
        // 2. Знаходимо єкземпляр сутності
        const user = await User.findByPk(userId);
        // 3. Використовуємо магічні методи єкземпляру сутності
        const tasksCount = await user.countTasks();
        return res.status(200).send(`${tasksCount}`);
    } catch (error) {
        next(error);
    }
}