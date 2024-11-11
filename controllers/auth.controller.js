const User = require('../models/user.model');
const { creaPass } = require('../utils/auth');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({ error: true, message: 'User already registered' });
    }
    const passwordCrypt = creaPass(req.body.password);
    const result = await User.create({
      email: req.body.email,
      password: passwordCrypt,
      username: req.body.username,
    });
    res.json({ error: false, message: result });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  res.json({
    token: jwt.sign({ user: req.user._id }, 'secret', { expiresIn: '1d' }),
  });
};

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id)

  res.status(200).json({ message: 'User has been verified', user })
}

const editUser = async (req, res, next) => {
  try {
      const { email, username } = req.body

      const updatedUser = await User.findByIdAndUpdate(
          req.user._id, 
          { email, username }, 
          { new: true }
      )

      if(!updatedUser) {
          res.status(400).json({ message: 'User not found' })
      }

      res.status(200).json({ message:'User has been updated', user: updatedUser })
  } catch (error) {
      next(error)
  }
}

const deleteUser = async (req, res) => {
  try {
      const deletedUser = User.findByIdAndDelete(req.user._id)

      if(!deletedUser) {
          res.status(400).json({ message: 'User not found' })
      }

      res.status(200).json({ message: 'User has been deleted' })
  } catch (error) {
      next(error)
  }
}

module.exports = {
  signup,
  login,
  getProfile,
  editUser,
  deleteUser
};
