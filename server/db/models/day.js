'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('day', {
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
    });
};

