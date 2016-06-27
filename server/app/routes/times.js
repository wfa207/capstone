'use strict';
var router = require('express').Router();
var db = require('../../db');
var Time = db.model('time');
var Auth = require('../configure/auth-middleware');

//get all times if route is api/times
//get all times for specific user if route is api/users/:userId/times
router.get('/', function (req, res) {
    let whereCondition = {};
    if (req.requestedUser) {
        whereCondition.where = {};
        whereCondition.where.userId = req.requestedUser.id;
    }
    Time.all(whereCondition)
    .then(times => {
        res.json(times);
    });
});


//creates new time for unsigned-in user if route is POST to api/times
//creates new time for signed-in user if route is POST to api/users/:userId/times
router.post('/', function(req, res, next) {
    Time.create(req.body)
    .tap(function(time) {
        if (req.requestedUser) {
            time.setUser(req.requestedUser);
            req.requestedUser.addtime(time);
        }
    })
    .then(time => {
        res.json(time);
    })
    .catch(next);
});

router.param('timeId', function(req, res, next, userId) {
    Time.findById(timeId)
    .then(time => {
        if (!time) {
            res.status(404);
            throw next(new Error('Time not found.'));
        }
        else {
            req.time = time;
            next();
        }
    })
    .catch(next);
});

router.get('/:timeId', function (req, res) {
    res.json(req.time);
});

router.put('/:timeId', function (req, res, next) {
    req.time.update(req.body)
    .then(function(time) {
        res.send(time);
    })
    .catch(next);
});

router.delete('/:timeId', function(req, res, next) {
    req.time.destroy()
    .then(function() {
        res.sendStatus(204)
    })
    .catch(next);
});

module.exports = router;
