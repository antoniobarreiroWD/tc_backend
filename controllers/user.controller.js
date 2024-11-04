const User = require('../models/user.model');

const getFavoriteRestaurants = async (req, res, next) => {
  try {
    const { _id: user_id } = req.user;
    const user = await User.findById(user_id).populate('favoriteRestaurants').exec();
    
    res.status(200).json(user.favoriteRestaurants);
  } catch (err) {
    next(err);
  }
};

const likeRestaurant = async (req, res, next) => {
  try {
    const { _id: user_id } = req.user;
    const { restaurant_id } = req.params;

    const userUpdated = await User.findByIdAndUpdate(
      user_id,
      { $addToSet: { favoriteRestaurants: restaurant_id } },
      { new: true }
    );

    res.status(200).json(userUpdated);
  } catch (err) {
    next(err);
  }
};

const dislikeRestaurant = async (req, res, next) => {
  try {
    const { _id: user_id } = req.user;
    const { restaurant_id } = req.params;

    const userUpdated = await User.findByIdAndUpdate(
      user_id,
      { $pull: { favoriteRestaurants: restaurant_id } },
      { new: true }
    );

    res.status(200).json(userUpdated);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFavoriteRestaurants,
  likeRestaurant,
  dislikeRestaurant,
};