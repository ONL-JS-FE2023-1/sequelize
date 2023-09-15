const { User } = require('../models');
const yup = require('yup');
const { USER_SCHEMA } = require('../schemas/user.schema');

module.exports.getUserInstance = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const user = await User.findByPk(userId);
        if(!user) {
            throw new Error('User not found');
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