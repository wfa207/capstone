'use strict';
var router = require('express').Router();
var Auth = require('../configure/auth-middleware')
module.exports = router;

router.use('/users', require('./users'));
router.use('/locations', require('./locations'));
router.use('/trips', require('./trips'));
router.use('/days', require('./days'));
router.use('/times', require('./times'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
