const colyseus = require('colyseus');
const command = require('@colyseus/command');
const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const ArraySchema = schema.ArraySchema;
const MapSchema = schema.MapSchema;
const {
  models: { Question },
} = require('../db');
const { QuestionSchema, AddQuestions } = require('./schemas/question');
const { UserSchema, AddUser } = require('./schemas/user');

// OVERALL GAME STATE
// users : {key: value}
// question : {}
class GameState extends Schema {
  constructor() {
    super();
    //Users Map with key=client.id, value=user object
    this.users = new MapSchema();
    //Questions array
    this.question = new QuestionSchema();
  }
}
schema.defineTypes(GameState, {
  users: { map: UserSchema },
  question: QuestionSchema,
});

class GameRoom extends colyseus.Room {
  constructor() {
    super();
    this.question = '';
    this.roundNumber = 1;
  }

  async onCreate(options) {
    //Set initial game state
    this.setState(new GameState());
    this.dispatcher = new command.Dispatcher(this);
    this.maxClients = 5;

    this.state.roundNumber = this.roundNumber;
    console.log('Room Created');
    this.dispatcher.dispatch(new AddQuestions());
  }

  // Authorize client based on provided options before WebSocket handshake is complete
  // onAuth(client, options, request) {}

  // When client successfully join the room
  onJoin(client, options, auth) {
    this.dispatcher.dispatch(new AddUser(), {
      username: options.username,
      clientId: client.id,
    });
  }

  // When a client leaves the room
  onLeave(client, consented) {}

  // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
  async onDispose() {}
}

module.exports = GameRoom;
