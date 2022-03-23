const colyseus = require('colyseus');
const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const ArraySchema = schema.ArraySchema;
const {
  models: { Lobby, User, Question },
} = require('../db');

// INDIVIDUAL STATES THAT MAKE UP GAME STATE
class UserSchema extends Schema {
  constructor() {
    super();
    this.username = '';
  }
}

class QuestionSchema extends Schema {
  constructor() {
    super();
    this.difficulty = false;
    this.title = '';
    this.question = '';
    this.testSpecs = '';
  }
}
schema.defineTypes(QuestionSchema, {
  difficulty: 'string',
  title: 'string',
  question: 'string',
  testSpecs: 'string',
});

// OVERALL GAME STATE
class GameState extends Schema {
  constructor() {
    super();
    this.questions = new ArraySchema();
  }
}
schema.defineTypes(GameState, {
  questions: [QuestionSchema],
});

class GameRoom extends colyseus.Room {
  // When room is initialized
  async onCreate(options) {
    this.setState(new GameState());

    console.log('hello', this.state.GameState);
    const abcd = this.questions;
    console.log('Room Created');
    const questionList = await Question.findAll();
    questionList.forEach((question, i) => {
      const temp = new QuestionSchema();
      temp.difficulty = question.difficulty;
      temp.title = question.title;
      temp.question = question.question;
      temp.testSpecs = question.testSpecs;
      abcd.push(temp);
    });
  }

  // Authorize client based on provided options before WebSocket handshake is complete
  // onAuth(client, options, request) {}

  // When client successfully join the room
  onJoin(client, options, auth) {
    console.log('hello', client);
  }

  // When a client leaves the room
  onLeave(client, consented) {}

  // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
  onDispose() {}
}

module.exports = GameRoom;
