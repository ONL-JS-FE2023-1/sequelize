const { User } = require('../models');

// Задача: написати контроллер на створення юзера
module.exports.createUser = async (req, res, next) => {
    try {
        const { body } = req;
        const createdUser = await User.create(body);
        return res.status(201).send(createdUser);
    } catch (error) {
        next(error);
    }
}

// Задача: реалізувати пошук всіх юзерів
module.exports.findAll = async (req, res, next) => {
    try {
        const allUsers = await User.findAll();
        return res.status(200).send(allUsers);
    } catch (error) {
        next(error);
    }
}

// Задача: реалізувати пошук якогось конкретного юзера
module.exports.findOneById = async (req, res, next) => {
    try {
        const {params: {id}} = req;
        const findUser = await User.findByPk(id);
        return res.status(200).send(findUser);
    } catch (error) {
        next(error);
    }
}

// Задача: дописати CRUD, дописати ще update та delete

module.exports.deleteById = async (req, res, next) => {
    try {
        const {params: {id}} = req;

        const rowsCount = await User.destroy({
            where: {
                id // id: id
            }
        });

        if(rowsCount > 0) {
            return res.status(200).send('Succesfull delete!');
        } else {
            return res.status(204);
        }
    } catch (error) {
        next(error);
    }
}

module.exports.updateById = async (req, res, next) => {
    try {
        const {params: {id}, body} = req;
        const result = await User.update(body, {
            where: {
                id // id: id
            }
        })
        return res.status(200);
    } catch (error) {
        next(error);
    }
}