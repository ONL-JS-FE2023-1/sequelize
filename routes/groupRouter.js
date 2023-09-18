const { Router } = require('express');
const { getUserInstance } = require('../middlewares/user.mv');
const GroupController = require('../controllers/Group.controller');

const groupRouter = Router();

// group section
groupRouter.post('/', GroupController.createGroup);
groupRouter.put('/:userId/:groupId', getUserInstance, GroupController.addUserToGroup)
groupRouter.get('/:userId', getUserInstance, GroupController.getUserGroups);
groupRouter.delete('/:userId/:groupId', getUserInstance, GroupController.deleteUserFromGroup);

module.exports = groupRouter;