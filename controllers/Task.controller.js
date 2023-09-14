const {Task, User} = require('../models');

module.exports.createTask = async (req, res, next) => {
    try {
        const {params: {userId}, body} = req;
        const user = await User.findByPk(userId);
        const result = await user.createTask(body);
        return res.status(201).send(result);
    } catch (error) {
        next(error);
    }
}