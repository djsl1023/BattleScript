const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Lobby = db.define(
  'lobby',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    round: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 10,
      },
    },
    userCount: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 0,
        max: 8,
      },
    },
  },
  { timestamps: false }
);

module.exports = Lobby;
