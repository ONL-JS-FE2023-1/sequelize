const { Router } = require('express');
const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');
const groupRouter = require('./groupRouter');

const router = Router();

router.use('/users', userRouter);
router.use('/task', taskRouter);
router.use('/groups', groupRouter);


module.exports = router;