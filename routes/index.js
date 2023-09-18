const { Router } = require('express');
const UserController = require('../controllers/User.controller');
const TaskController = require('../controllers/Task.controller');
const GroupController = require('../controllers/Group.controller');
const { getUserInstance, validateUser } = require('../middlewares/user.mv');
const { validateTask } = require('../middlewares/task.mw');

const router = Router();

// user section
router.post('/user', validateUser, UserController.createUser);
router.get('/users', UserController.findAll);
router.get('/user/:userId', getUserInstance, UserController.findOneById);
router.get('/users/groups/:userId', UserController.getUserWithGroups);
router.delete('/user/:userId', UserController.deleteById);
router.put('/user/:userId', getUserInstance, UserController.updateById);

// task section
router.post('/task/:userId', validateTask, getUserInstance, TaskController.createTask);
router.get('/tasks/:userId', getUserInstance, TaskController.getAllUserTasks);
router.get('/task-count/:userId', getUserInstance, TaskController.getCountOfTasks);

// group section
router.post('/groups', GroupController.createGroup);
router.put('/groups/:userId/:groupId', getUserInstance, GroupController.addUserToGroup)
router.get('/groups/:userId', getUserInstance, GroupController.getUserGroups);
module.exports = router;