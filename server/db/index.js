//this is the access point for all things database related!

const db = require('./db');
const Lobby = require('./models/Lobby');
const Question = require('./models/Question');
const LobbyQuestion = require('./models/LobbyQuestion');

//associations could go here!

Lobby.belongsToMany(Question, { through: LobbyQuestion });
Question.belongsToMany(Lobby, { through: LobbyQuestion });

module.exports = {
  db,
  models: {
    Lobby,
    Question,
    LobbyQuestion,
  },
};
