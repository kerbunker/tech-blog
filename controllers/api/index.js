// imports data from the express session for routes
const router = require('express').Router();

// connects to the different routes files
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// directs the router to the appropriate route file
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// exports the router
module.exports = router;
