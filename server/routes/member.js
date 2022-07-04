'use strict';

const express = require('express');
const User = require('../models/user');
const routeGuard = require('./../middleware/route-guard');

const router = new express.Router();

//display all members
router.get('/', (req, res, next) => {
  let groups;
  User.find()
    .then((users) => {
      res.json({ users });
    })
    .catch((error) => next(error));
});

// member addition
router.post('/member/edit', routeGuard, (req, res, next) => {
  const { name } = req.body;
  console.log(name);

  Group.create({
    name,
    member: req.user._id
  })
    .then((member) => {
      res.json({ member });
    })
    .catch((error) => next(error));
});

// remove member

// edit member?

//display single member

module.exports = router;
