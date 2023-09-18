const UserNotFound = require('../errors/UserNotFound');
const { User, Group } = require('../models');

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
        const { userInstance } = req;
        return res.status(200).send(userInstance);
    } catch (error) {
        next(error);
    }
}

// Задача: дописати CRUD, дописати ще update та delete

module.exports.deleteById = async (req, res, next) => {
    try {
        const {params: {userId}} = req;

        const rowsCount = await User.destroy({
            where: {
                id: userId
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
        const { userInstance, body } = req;
        const result = await userInstance.update(body);
        return res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

// Задача: отримати сутність юзера і всі групи, в яких цей юзер состоїть
// при тому, потрібно зберегти всю інформацію про групи
// тобто, потрібно зберегти інформацію про сутність юзера і про сутність групи
// module.exports.getUserWithGroups = async (req, res, next) => { // lazy load
//     try {
//         const {params: {userId}} = req;
//         const user = await User.findByPk(userId);

//         if(!user) {
//             throw new UserNotFound();
//         }

//         const groups = await user.getGroups();

//         return res.status(200).send({data: {user, groups}});
//     } catch (error) {
//         next(error);
//     }
// }

// задача: знайти юзера зі всіма його групами
module.exports.getUserWithGroups = async (req, res, next) => { // eager load
    try {
        const {params: {userId}} = req;

        const userWithGroups = await User.findByPk(userId, {
            // include: [Group] --> LEFT JOIN
            include: { // --> INNER JOIN
                model: Group,
                required: true,
                through: { // налаштування зв'язуючої таблиці
                    attributes: [] //працює на зв'язуючу таблицю
                },
                attributes: ['id', 'name'] // працює на таблицю groups
            }
        });

        if(!userWithGroups) {
            throw new UserNotFound();
        }

        return res.status(200).send(userWithGroups);
    } catch (error) {
        next(error);
    }
}