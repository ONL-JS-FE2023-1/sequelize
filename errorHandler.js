const {ValidationError} = require('yup');
const UserNotFound = require('./errors/UserNotFound');

module.exports.errorHandler = async(err, req, res, next) => {
    if(err instanceof ValidationError) {
        return res.status(400).send(err.message);
    }

    if(err instanceof UserNotFound) {
        return res.status(404).send(err.message);
    }
}