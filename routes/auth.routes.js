const express = require('express');
const router = express.Router();
const passport = require('passport');
const { login, signup, getProfile, editUser, deleteUser } = require('../controllers/auth.controller');



router.all('/fail', (_, res) => {
  res.status(401).json({ message: 'Unauthorized' });
});

router.post('/login', passport.authenticate("login", { session: false, failureRedirect: "/api/auth/fail" }), login);

router.post('/signup', signup);

router.post('/getprofile', passport.authenticate('jwt', { session: false }), getProfile);

router.put('/edit', passport.authenticate('jwt', { session: false }), editUser)

router.delete('/delete', passport.authenticate('jwt', { session: false }), deleteUser)

module.exports = router;