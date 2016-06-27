'use strict';
var router = require('express').Router();
var db = require('../../db');
var Trip = db.model('trip');
var Auth = require('../configure/auth-middleware');

//get all trips if route is api/trips
//get all trips for specific user if route is api/users/:userId/trips
router.get('/', function (req, res) {
    let whereCondition = {};
    if (req.requestedUser) {
        whereCondition.where = {};
        whereCondition.where.userId = req.requestedUser.id;
    }
    Trip.all(whereCondition)
    .then(trips => {
        res.json(trips);
    });
});


//creates new trip for unsigned-in user if route is POST to api/trips
//creates new trip for signed-in user if route is POST to api/users/:userId/trips
router.post('/', function(req, res, next) {
    Trip.create(req.body)
    .tap(function(trip) {
        if (req.requestedUser) {
            trip.setUser(req.requestedUser);
            req.requestedUser.addTrip(trip);
        }
    })
    .then(trip => {
        res.json(trip);
    })
    .catch(next);
})

router.param('tripId', function(req, res, next, userId) {
    Trip.findById(tripId)
    .then(trip => {
        if (!trip) {
            res.status(404);
            throw next(new Error('Trip not found.'));
        }
        else {
            req.trip = trip;
            next();
        }
    })
    .catch(next);
});

router.get('/:tripId', function (req, res) {
    res.json(req.trip);
});

router.put('/:tripId', function (req, res, next) {
    req.trip.update(req.body)
    .then(function(trip) {
        res.send(trip);
    })
    .catch(next);
});

router.delete('/:tripId', function(req, res, next) {
    req.trip.destroy()
    .then(function() {
        res.sendStatus(204)
    })
    .catch(next);
});

module.exports = router;
