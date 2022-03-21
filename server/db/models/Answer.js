const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Answer = db.define(
  'answer',
  {
    answer: {
      type: DataTypes.TEXT,
    },
    points: {
      type: DataTypes.INTEGER,
    },
    correct: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    bestWorst: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isAnswered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

module.exports = Answer;
