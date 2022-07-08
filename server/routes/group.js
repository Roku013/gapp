'use strict';

const express = require('express');
const Group = require('../models/group');
const User = require('../models/user');
const routeGuard = require('./../middleware/route-guard');

const router = new express.Router();

// group search
router.get('/', (req, res, next) => {
  const { groupName } = req.query;
  Group.find({
    members: {
      $in: [req.user._id]
    },
    name: { $regex: new RegExp(groupName, 'i') }
  })
    .then((groups) => {
      res.json({ groups });
    })
    .catch((error) => {
      next(error);
    });
});

/*
router.get('/', (req, res, next) => {
  const { groupName } = req.query;
  Group.find({
    members: {
      $in: [req.user._id]
    },
    name: { $regex: new RegExp(groupName, 'i') }
  })
    .then((groups) => {
      res.json({ groups });
    })
    .catch((error) => {
      next(error);
    });
});

/*router.get('/', (req, res, next) => {
  const { groupName } = req.query;

  //   let isGroupMember = groups.map((group) =>
  //     group.members.includes('62c2d905d60634e0fa216058')
  //   );
  //   console.log('isGroupMember: ' + isGroupMember);
  //   if (isGroupMember) {
  //     return Group.find({
  //       // _id: { $nin: isGroupMember },
  //       name: { $regex: new RegExp(groupName, 'i') }
  //     });
  //   }
  // })
  // .then((groups) => {
  console.log('console logging');
  Group.find({
    name: { $regex: new RegExp(groupName, 'i') }
  })
    .then((groups) => {
      res.json({ groups });
    })
    .catch((error) => {
      next(error);
    });
});*/

/*
// group search
router.get('/', (req, res, next) => {
  const { groupName } = req.query;
  Group.find({
    name: { $regex: new RegExp(groupName, 'i') }
  })
    .then((groups) => {
      res.json({ groups });
    })
    .catch((error) => {
      next(error);
    });
});
*/

// group profile - display only groups youre creator of
router.get('/profile/:id', (req, res, next) => {
  Group.find({
    creator: req.user._id
  })
    .then((groups) => res.json({ groups }))
    .catch((err) => next(err));
});

// group creation
router.post('/add', routeGuard, (req, res, next) => {
  const { name, description } = req.body;
  const { creator } = req.user._id;
  // console.log(name);

  Group.create({
    name,
    description,
    creator: req.user._id,
    members: [req.user._id]
  })
    .then((group) => {
      res.json({ group });
    })
    .catch((error) => next(error));
});

// group member search
router.get('/:id/member/search', (req, res, next) => {
  const { name } = req.query;
  const groupId = req.params.id;
  // console.log(req.query);

  Group.findById(groupId)
    .then((group) => {
      const memberIds = group.members;
      return User.find({
        _id: { $nin: memberIds },
        name: { $regex: new RegExp(name, 'i') }
      });
    })
    .then((users) => {
      res.json({ users });
    })
    .catch((error) => {
      next(error);
    });
});

// add group member
router.post('/:id/member/add', (req, res, next) => {
  const groupId = req.params.id;
  const newMemberId = req.body.member;

  Group.findById(groupId)
    .then((group) => {
      let isGroupMember = group.members
        .map((memberId) => String(memberId))
        .includes(newMemberId);
      if (!isGroupMember) {
        return Group.findByIdAndUpdate(groupId, {
          $push: { members: newMemberId }
        });
      }
    })
    .then(() => {
      res.json({});
    })
    .catch((err) => next(err));
});

/*// add group member
router
  .delete('/:id/member/add', (req, res, next) => {
    const groupId = req.params.id;
    const memberId = req.body.member;

    Group.findByIdAndRemove(groupId, {
      $pull: { members: memberId }
    });
  })
  .then(() => {
    res.json({});
  })
  .catch((err) => next(err));*/

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
      // console.log(group);
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
    .populate('creator members')
    .then((group) => {
      res.json({ group });
    })
    .catch((error) => next(error));
});

module.exports = router;
