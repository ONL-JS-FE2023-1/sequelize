const { User } = require('../models');

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