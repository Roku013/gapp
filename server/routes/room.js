'use strict';

const express = require('express');
const Group = require('../models/group');
const Message = require('../models/message');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;
  let group;
  Group.findById(id)
    .then((document) => {
      group = document;
      return Message.find({ room: id }).populate('user');
    })
    .then((messages) => {
      res.json({ messages, group });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
