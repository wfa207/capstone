'use strict';

var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('location', {
        name: {
            type: Sequelize.STRING
        },
        coordinates: {
            type: Sequelize.ARRAY(Sequelize.DOUBLE), 
            allowNull: false,
            validate: {notEmpty: true}
        },
        city: {
            type: Sequelize.STRING,
            validate: {notEmpty: true}
        },
        state: {
            type: Sequelize.STRING,
            validate: {notEmpty: true}
        },
        country: {
            type: Sequelize.STRING,
            validate: {notEmpty: true}
        },
        timeSpent: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {min: 0},
            defaultValue: 0
        },
        pictureUrl: {
            type: Sequelize.STRING, 
            validate: {isUrl: true}
        },
        description: {
            type: Sequelize.TEXT
        },
    });

};
