// connects to the express data
const router = require('express').Router();

// connects the different route files
const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// directs to the appropriate routes
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

// exports the router
module.exports = router;
