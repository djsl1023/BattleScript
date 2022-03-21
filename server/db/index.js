//this is the access point for all things database related!

const db = require('./db');
const User = require('./models/User');
const Lobby = require('./models/Lobby');
const Question = require('./models/Question');
const LobbyQuestion = require('./models/LobbyQuestion');
const Answer = require('./models/Answer');
const Humiliation = require('./models/Humiliation');

//associations could go here!

User.belongsToMany(Question, { through: 'Answer' });
Question.belongsToMany(User, { through: 'Answer' });

Lobby.hasMany(User);
User.belongsTo(Lobby);

Lobby.belongsToMany(Question, { through: 'LobbyQuestion' });
Question.belongsToMany(Lobby, { through: 'LobbyQuestion' });

module.exports = {
  db,
  models: {
    User,
    Answer,
    Lobby,
    Question,
    LobbyQuestion,
    Humiliation,
  },
};
