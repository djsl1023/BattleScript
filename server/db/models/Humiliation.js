const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Humiliation = db.define('humiliation', {
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Humiliation;
