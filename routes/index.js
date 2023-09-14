const { Router } = require('express');
const UserController = require('../controllers/User.controller');
const TaskController = require('../controllers/Task.controller');

const router = Router();

// user section
router.post('/user', UserController.createUser);
router.get('/users', UserController.findAll);
router.get('/user/:id', UserController.findOneById);
router.delete('/user/:id', UserController.deleteById);
router.put('/user/:id', UserController.updateById);

// task section
router.post('/task/:userId', TaskController.createTask);

module.exports = router;