'use strict';
var router = require('express').Router();
var db = require('../../db');
var User = db.model('user');
var Auth = require('../configure/auth-middleware');
var tripRouter = require('./trips');
var locationRouter = require('./locations');
var dayRouter = require('./days');
var timeRouter = require('./times');


router.get('/', function (req, res) {
    User.all()
    .then(users => {
        res.json(users);
    });
});

router.param('userId', function(req, res, next, userId) {
    User.findById(userId)
    .then(user => {
        if (!user) {
            res.status(404);
            let error = new Error('User not found.');
            error.status = 404;
            throw error;
        }
        else {
            req.requestedUser = user;
            next();
        }
    })
    .catch(next);
});

router.get('/:userId', function (req, res) {
    res.json(req.requestedUser);
});

router.put('/:userId', function (req, res, next) {
    req.requestedUser.update(req.body)
    .then(function(user) {
        res.send(user);
    })
    .catch(next);
});

router.delete('/:userId', function(req, res, next) {
    req.requestedUser.destroy()
    .then(function() {
        res.sendStatus(204)
    })
    .catch(next);
});

router.use('/:userId/trips', tripRouter);
router.use('/:userId/locations', locationRouter);
router.use('/:userId/days', dayRouter);
router.use('/:userId/times', timeRouter);


module.exports = router;
