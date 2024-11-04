const { Router } = require('express');
const {
  getFavoriteRestaurants,
  likeRestaurant,
  dislikeRestaurant,
} = require('../controllers/user.controller');
const passport = require('passport');

const router = Router();

router.get(
  '/getFavoriteRestaurants',
  passport.authenticate('jwt', { session: false }),
  getFavoriteRestaurants
);
router.put(
  '/likeRestaurant/:restaurant_id',
  passport.authenticate('jwt', { session: false }),
  likeRestaurant
);
router.put(
  '/dislikeRestaurant/:restaurant_id',
  passport.authenticate('jwt', { session: false }),
  dislikeRestaurant
);

module.exports = router;