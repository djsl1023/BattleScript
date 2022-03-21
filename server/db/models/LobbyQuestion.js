const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const LobbyQuestion = db.define('lobby-question', {});

module.exports = LobbyQuestion;
