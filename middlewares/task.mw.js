const { TASK_SCHEMA } = require('../schemas/task.schema');

module.exports.validateTask = async(req, res, next) => {
    try {
        const { body } = req;
        const validatedTask = await TASK_SCHEMA.validate(body);
        if(validatedTask) {
            next();
        }
    } catch (error) {
        next(error)
    }
}