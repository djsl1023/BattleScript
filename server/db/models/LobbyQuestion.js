const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const LobbyQuestion = db.define('lobby-question', {
  lobbyId: {
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
});

module.exports = LobbyQuestion;
