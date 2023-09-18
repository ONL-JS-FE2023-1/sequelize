const { User } = require('../models');
const UserNotFound = require('../errors/UserNotFound');
const { USER_SCHEMA } = require('../schemas/user.schema');

module.exports.getUserInstance = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const user = await User.findByPk(userId, {
            attributes: {
                exclude: ['password']
            }
        });
        if(!user) {
            throw new UserNotFound('User not found');
        }
        req.userInstance = user;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports.validateUser = async (req, res, next) => {
    try {
        const { body } = req;
        const validated = await USER_SCHEMA.validate(body);
        if(validated) {
            next();
        }
    } catch (error) {
        next(error);
    }
}