const { Router } = require('express');
const UserController = require('../controllers/User.controller');

const router = Router();

router.post('/user', UserController.createUser);
router.get('/users', UserController.findAll);
router.get('/user/:id', UserController.findOneById);
router.delete('/user/:id', UserController.deleteById);
router.put('/user/:id', UserController.updateById);

module.exports = router;