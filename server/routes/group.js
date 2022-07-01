'use strict';

const express = require('express');
const Group = require('../models/group');
const User = require('../models/user');
const routeGuard = require('./../middleware/route-guard');

const router = new express.Router();

//display single group
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Group.findById(id)
    .populate('creator')
    .then((group) => {
      res.json({ group });
    })
    .catch((error) => next(error));
});

// group creation
router.post('/', routeGuard, (req, res, next) => {
  const { name, description, creator } = req.body;
  // const { creator } = req.user._id;
  console.log(name);

  Group.create({
    name,
    description,
    creator: req.user._id
  })
    .then((group) => {
      res.json({ group });
    })
    .catch((error) => next(error));
});

module.exports = router;
