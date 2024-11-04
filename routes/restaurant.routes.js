const router = require('express').Router();
const {
  listAllRestaurants,
  getOneRestaurant,
  createOneRestaurant,
  editOneRestaurant,
  deleteOneRestaurant,
} = require('../controllers/restaurant.controller');

router.get('/list', listAllRestaurants);

router.get('/getOne/:restaurant_id', getOneRestaurant);

router.post('/create', createOneRestaurant);

router.put('/edit/:restaurant_id', editOneRestaurant);

router.delete('/delete/:restaurant_id', deleteOneRestaurant);

module.exports = router;