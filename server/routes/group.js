'use strict';

const express = require('express');
const Group = require('../models/group');
const User = require('../models/user');
const routeGuard = require('./../middleware/route-guard');

const router = new express.Router();

//display all groups
router.get('/', (req, res, next) => {
  let groups;
  Group.find()
    .then((groups) => {
      res.json({ groups });
    })
    .catch((error) => next(error));
});

// group creation
router.post('/add', routeGuard, (req, res, next) => {
  const { name, description } = req.body;
  const { creator } = req.user._id;
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

// add group member
/*
router.post('/:id/member/add', (req, res, next) => {
  const userId = User._id;
  console.log('userID: ' + userId);

  User.findById(userId).then((user) => {
    Group.findByIdAndUpdate(req.group.id, { $push: { members: user._id } })
      .then(() => {
        console.log('member is added to the group');
        res.redirect(`/group`);
      })
      .catch((err) => next(err));
  });
});*/

// remove group
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Group.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/group');
    })
    .catch((err) => {
      next(err);
    });
});

// edit group
router.patch('/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const { name, description, members } = req.body;
  const creator = req.user._id;
  Group.findOneAndUpdate(
    { _id: id, creator },
    { name, description, members },
    { new: true }
  )

    .then((group) => {
      console.log(group);
      res.json({ group });
    })
    .catch((error) => {
      next(error);
    });
});

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

module.exports = router;
