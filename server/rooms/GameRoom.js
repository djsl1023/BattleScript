const colyseus = require('colyseus');
const command = require('@colyseus/command');
const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const ArraySchema = schema.ArraySchema;
const MapSchema = schema.MapSchema;
const {
  QuestionSchema,
  getQuestions,
  insertQuestion,
} = require('./schemas/question');
const { UserSchema, AddUser, RemoveUser } = require('./schemas/user');
const { MessagesSchema, AddMessage } = require('./schemas/messages');

// OVERALL GAME STATE
// users : {key: value}
// question : {}
// gameStatus: 'lobby', 'prompt', 'failvote', 'passvote', 'tally', 'final'

class GameState extends Schema {
  constructor() {
    super();
    //Users Map with key=client.id, value=user object
    this.users = new MapSchema();
    //Questions array
    this.question = new QuestionSchema();
    this.gameStatus = 'lobby';
    this.messages = new MessagesSchema();
  }
}
schema.defineTypes(GameState, {
  users: { map: UserSchema },
  question: QuestionSchema,
  gameStatus: 'string',
  messages: MessagesSchema,
});

class GameRoom extends colyseus.Room {
  constructor() {
    super();
    this.questions = [];
    this.roundNumber = 1;
    this.message = [];
  }

  async onCreate(options) {
    //Set initial game state
    this.setState(new GameState());
    this.dispatcher = new command.Dispatcher(this);
    this.questions = await getQuestions();
    this.maxClients = 5;
    // this.state.roundNumber = this.roundNumber;
    this.gameStatus = 'lobby';
    this.messages = ['chatroom'];

    this.onMessage('start', (client, { gameStatus }) => {
      this.state.gameStatus = gameStatus;
      console.log(client.sessionId, "sent 'action' message: ", gameStatus);
    });

    this.onMessage('chat', (client, message) => {
      // this.dispatcher.dispatch(new AddMessage(), {
      //   message: message,
      // });
      // this.state.messages.message = [...this.state.messages.message, message];
      client.send('chat', { user: client.id, message: message });
      // // newMessage.message = message;
      console.log('backendddd', message);
      // console.log(this.state.messages);
    });
    console.log('Room Created');
    // this.dispatcher.dispatch(new AddQuestions());
    this.dispatcher.dispatch(new insertQuestion(), {
      roundNumber: this.roundNumber,
      questions: this.questions,
    });
  }

  // Authorize client based on provided options before WebSocket handshake is complete
  // onAuth(client, options, request) {}

  // When client successfully join the room
  onJoin(client, options, auth) {
    this.dispatcher.dispatch(new AddUser(), {
      username: options.username,
      clientId: client.id,
    });
    console.log(this.state.question);
  }

  // When a client leaves the room
  onLeave(client, consented) {
    this.dispatcher.dispatch(new RemoveUser(), {
      clientId: client.id,
    });
  }

  // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
  async onDispose() {}
}

module.exports = GameRoom;
