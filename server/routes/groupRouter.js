const { Router } = require('express');
const { getUserInstance } = require('../middlewares/user.mv');
const GroupController = require('../controllers/Group.controller');
const multer  = require('multer');
const { STATIC_PATH } = require('../config/path.config');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, STATIC_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.${file.originalname}`)
    }
})

const upload = multer({ storage }) // storage: storage

const groupRouter = Router();

// group section
groupRouter.post('/', GroupController.createGroup);
groupRouter.put('/:userId/:groupId', getUserInstance, GroupController.addUserToGroup)
groupRouter.get('/:userId', getUserInstance, GroupController.getUserGroups);
groupRouter.get('/', GroupController.getAllGroups);
groupRouter.delete('/:userId/:groupId', getUserInstance, GroupController.deleteUserFromGroup);
groupRouter.get('/:groupId/members', GroupController.getGroupWithMembers);
groupRouter.post('/:groupId', upload.single('groupAvatar'), GroupController.createGroupImage);

module.exports = groupRouter;