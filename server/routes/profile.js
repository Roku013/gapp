const express = require('express');
const User = require('../models/user');

const routeGuard = require('./../middleware/route-guard');

const router = new express.Router();

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  let user;
  User.findById(id)
    .then((profile) => {
      user = profile;

      res.json({ profile: profile });
    })
    .catch((error) => {
      next(error);
    });
});

router.patch('/', routeGuard, (req, res, next) => {
  const { name, email, picture } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email, picture }, { new: true })
    .then((user) => {
      res.json({ profile: user });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-out', (req, res) => {
  req.session.destroy();
  res.json({});
});

module.exports = router;
