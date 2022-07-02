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

router.patch('/:id', routeGuard, (req, res, next) => {
  console.log('hello');
  const { id } = req.params;
  const { name, email, picture } = req.body;
  console.log('name, email ' + name + email);
  User.findByIdAndUpdate(id, { name, email, picture }, { new: true })
    .then((user) => {
      console.log(user);
      res.json({ user });
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
