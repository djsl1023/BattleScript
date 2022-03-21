//this is the access point for all things database related!

const db = require('./db');
const Lobby = require('./models/Lobby');

//associations could go here!

module.exports = {
  db,
  models: {
    Lobby,
  },
};
