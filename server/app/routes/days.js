'use strict';
var router = require('express').Router();
var db = require('../../db');
var Day = db.model('day');
var Auth = require('../configure/auth-middleware');

//get all days if route is api/days
//get all days for specific user if route is api/users/:userId/days
router.get('/', function (req, res) {
    let whereCondition = {};
    if (req.requestedUser) {
        whereCondition.where = {};
        whereCondition.where.userId = req.requestedUser.id;
    }
    Day.all(whereCondition)
    .then(days => {
        res.json(days);
    });
});


//creates new day for unsigned-in user if route is POST to api/days
//creates new day for signed-in user if route is POST to api/users/:userId/days
router.post('/', function(req, res, next) {
    Day.create(req.body)
    .tap(function(day) {
        if (req.requestedUser) {
            day.setUser(req.requestedUser);
            req.requestedUser.addday(day);
        }
    })
    .then(day => {
        res.json(day);
    })
    .catch(next);
});

router.param('dayId', function(req, res, next, userId) {
    Day.findById(dayId)
    .then(day => {
        if (!day) {
            res.status(404);
            throw next(new Error('Day not found.'));
        }
        else {
            req.day = day;
            next();
        }
    })
    .catch(next);
});

router.get('/:dayId', function (req, res) {
    res.json(req.day);
});

router.put('/:dayId', function (req, res, next) {
    req.day.update(req.body)
    .then(function(day) {
        res.send(day);
    })
    .catch(next);
});

router.delete('/:dayId', function(req, res, next) {
    req.day.destroy()
    .then(function() {
        res.sendStatus(204)
    })
    .catch(next);
});

module.exports = router;
