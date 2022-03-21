const { Sequelize, DataTypes } = require('sequelize');
const { ModuleFilenameHelpers } = require('webpack');
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

//Math.random().toString(36).substr(2, 5)
