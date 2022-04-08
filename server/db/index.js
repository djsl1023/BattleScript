//this is the access point for all things database related!

const db = require('./db');
const Question = require('./models/Question');

//associations could go here!

module.exports = {
  db,
  models: {
    Question,
  },
};
