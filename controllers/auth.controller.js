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

const verify = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  signup,
  login,
  verify
};
