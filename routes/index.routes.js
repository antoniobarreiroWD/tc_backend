const router = require('express').Router();
const restaurantRoutes = require('./restaurant.routes');
const authRoutes = require('./auth.routes');

router.use('/restaurants', restaurantRoutes);
router.use('/auth', authRoutes);
router.use('/user', require('./user.routes'));

module.exports = router;