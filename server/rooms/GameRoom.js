const colyseus = require('colyseus');
const command = require('@colyseus/command');
const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const ArraySchema = schema.ArraySchema;
const MapSchema = schema.MapSchema;
const {
  models: { Question },
} = require('../db');
<<<<<<< HEAD
const {
  QuestionSchema,
  getQuestions,
  insertQuestion,
} = require('./schemas/question');
const { UserSchema, AddUser } = require('./schemas/user');
=======
const QuestionSchema = require('./schemas/question');
const GameStatusSchema = require('./schemas/gameStatus');
const { UserSchema, AddUser, RemoveUser } = require('./schemas/user');
>>>>>>> origin/main

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
  }
}
schema.defineTypes(GameState, {
  users: { map: UserSchema },
  question: QuestionSchema,
  gameStatus: 'string',
});

class GameRoom extends colyseus.Room {
  constructor() {
    super();
    this.questions = [];
    this.roundNumber = 1;
  }

  async onCreate(options) {
    //Set initial game state
    this.setState(new GameState());
    this.dispatcher = new command.Dispatcher(this);
<<<<<<< HEAD
    this.questions = await getQuestions();
    this.maxClients = 5;
    // this.state.roundNumber = this.roundNumber;
=======
    this.gameStatus = 'lobby';

    //Get list of questions, Will need tweaking to randomize
    // const questionList = await Question.findAll();
    //Map through questions list and create new array of question instances(schemas)
    // const mappedList = questionList.map((question) => {
    //   let temp = new QuestionSchema();
    //   temp.id = question.id;
    //   temp.difficulty = question.difficulty;
    //   temp.title = question.title;
    //   temp.question = question.question;
    //   temp.testSpecs = question.testSpecs;
    //   return temp;
    // });
    //Set gamestate questions to newly created Array of Question instances(schemas)
    // this.state.question = [...mappedList];
    this.onMessage('start', (client, { gameStatus }) => {
      this.state.gameStatus = gameStatus;

      console.log(client.sessionId, "sent 'action' message: ", gameStatus);
    });
>>>>>>> origin/main
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
