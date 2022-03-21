const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Answer = db.define('answer', {
  answer: {
    type: DataTypes.TEXT,
  },
  points: {
    type: DataTypes.INTEGER,
  },
  correct: {
    type: DataTypes.BOOLEAN,
  },
  bestWorst: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = Answer;
