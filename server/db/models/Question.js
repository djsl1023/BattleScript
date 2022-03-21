const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Question = db.define(
  'question',
  {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastUsed: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  { timestamps: false }
);

module.exports = Question;
