const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Solution = db.define(
  'solution',
  {
    solution: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: false }
);

module.exports = Solution;
