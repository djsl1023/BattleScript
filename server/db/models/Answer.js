const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Answer = db.define('answer', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
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
