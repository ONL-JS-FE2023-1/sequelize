const { Router } = require('express');
const { validateTask } = require('../middlewares/task.mw');
const { getUserInstance } = require('../middlewares/user.mv');
const TaskController = require('../controllers/Task.controller');

const taskRouter = Router();

// task section
taskRouter.post('/:userId', validateTask, getUserInstance, TaskController.createTask);
taskRouter.get('/:userId', getUserInstance, TaskController.getAllUserTasks);
taskRouter.get('/count/:userId', getUserInstance, TaskController.getCountOfTasks);

module.exports = taskRouter;