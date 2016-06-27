'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('time', {
        arrived: {
            type: Sequelize.DATE,
        },
        left: {
            type: Sequelize.DATE,
        },
    });
};

