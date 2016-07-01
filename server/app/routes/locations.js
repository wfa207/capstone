'use strict';
var router = require('express').Router();
var db = require('../../db');
var Location = db.model('location');
var Auth = require('../configure/auth-middleware');

//get all locations if route is api/locations
//get all locations for specific user if route is api/users/:userId/locations
router.get('/', function (req, res) {
    let whereCondition = {};
    if (req.requestedUser) {
        whereCondition.where = {};
        whereCondition.where.userId = req.requestedUser.id;
    }
    Location.all(whereCondition)
    .then(locations => {
        res.json(locations);
    });
});


//creates new location for unsigned-in user if route is POST to api/locations
//creates new location for signed-in user if route is POST to api/users/:userId/locations
router.post('/', function(req, res, next) {
    Location.create(req.body)
    .tap(function(location) {
        if (req.requestedUser) {
            location.setUser(req.requestedUser);
            req.requestedUser.addlocation(location);
        }
    })
    .then(location => {
        res.json(location);
    })
    .catch(next);
});

router.param('locationId', function(req, res, next, userId) {
    Location.findById(locationId)
    .then(location => {
        if (!location) {
            res.status(404);
            let error = new Error('Location not found.');
            error.status = 404;
            throw error;
        }
        else {
            req.location = location;
            next();
        }
    })
    .catch(next);
});

router.get('/:locationId', function (req, res) {
    res.json(req.location);
});

router.put('/:locationId', function (req, res, next) {
    req.location.update(req.body)
    .then(function(location) {
        res.send(location);
    })
    .catch(next);
});

router.delete('/:locationId', function(req, res, next) {
    req.location.destroy()
    .then(function() {
        res.sendStatus(204)
    })
    .catch(next);
});

module.exports = router;
