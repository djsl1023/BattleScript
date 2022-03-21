const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Lobby = db.define('lobby', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  round: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 10,
    },
  },
});

module.exports = Lobby;

//Do we want to add a # of users field with a "max"? Or do that outside the DB to not permit more than 8 people from joining the lobby.
//Math.random().toString(36).substr(2, 5)
