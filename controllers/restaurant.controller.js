const { Types } = require('mongoose');
const Restaurant = require('../models/restaurant.model');

const listAllRestaurants = async (_req, res, next) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(restaurants);
  } catch (err) {
    next(err);
  }
};

const getOneRestaurant = async (req, res, next) => {
  try {
    const { restaurant_id } = req.params;

    if (!Types.ObjectId.isValid(restaurant_id)) {
      return res.status(400).json({ msg: 'Invalid restaurant id!' });
    }

    const restaurant = await Restaurant.findById(restaurant_id).select('-createdAt -updatedAt');
    if (!restaurant) {
      return res.status(404).json({ msg: 'Restaurant not found!' });
    }
    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
};

const createOneRestaurant = async (req, res, next) => {
  const { name, address, image } = req.body;

  if (!name || !address || !image) {
    return res.status(400).json({ msg: 'Please fill in all required fields!' });
  }

  try {
    console.log("Datos recibidos:", req.body); 
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (err) {
    console.error("Error en createOneRestaurant:", err);
    next(err);  
  }
};


const editOneRestaurant = async (req, res, next) => {
  try {
    const { restaurant_id } = req.params;

    if (!Types.ObjectId.isValid(restaurant_id)) {
      return res.status(400).json({ msg: 'Invalid restaurant id!' });
    }

    const restaurant = await Restaurant.findByIdAndUpdate(restaurant_id, req.body, { new: true }).select('-createdAt -updatedAt');
    if (!restaurant) {
      return res.status(404).json({ msg: 'Restaurant not found!' });
    }

    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
};

const deleteOneRestaurant = async (req, res, next) => {
  try {
    const { restaurant_id } = req.params;

    if (!Types.ObjectId.isValid(restaurant_id)) {
      return res.status(400).json({ msg: 'Invalid restaurant id!' });
    }

    const restaurant = await Restaurant.findByIdAndDelete(restaurant_id);
    if (!restaurant) {
      return res.status(404).json({ msg: 'Restaurant not found!' });
    }
    res.status(200).json({ msg: 'Restaurant successfully deleted!' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listAllRestaurants,
  getOneRestaurant,
  createOneRestaurant,
  editOneRestaurant,
  deleteOneRestaurant,
};
