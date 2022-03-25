const colyseus = require('colyseus');
const command = require('@colyseus/command');
const schema = require('@colyseus/schema');
const Schema = schema.Schema;
//const ArraySchema = schema.ArraySchema;
const MapSchema = schema.MapSchema;
const {
  QuestionSchema,
  getQuestions,
  insertQuestion,
} = require('./schemas/question');
const { UserSchema, AddUser, RemoveUser } = require('./schemas/user');
const { AnswerSchema, AddAnswer } = require('./schemas/answer');
const { VoteSchema, AddVote } = require('./schemas/vote');

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
    //votes and answers were separate so that the objects being passed back and forth are smaller.
    this.failAnswers = new MapSchema();
    this.passAnswers = new MapSchema();
    this.failVotes = new MapSchema();
    this.passVotes = new MapSchema();
  }
}
schema.defineTypes(GameState, {
  users: { map: UserSchema },
  question: QuestionSchema,
  gameStatus: 'string',
  // answer: map all answers
  failAnswers: { map: AnswerSchema },
  passAnswers: { map: AnswerSchema },
  failVotes: { map: VoteSchema },
  passVotes: { map: VoteSchema },
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
    this.questions = await getQuestions();
    this.maxClients = 5;
    // this.state.roundNumber = this.roundNumber;
    this.gameStatus = 'lobby';

    this.onMessage('start', (client, { gameStatus }) => {
      this.state.gameStatus = gameStatus;

      console.log(client.sessionId, "sent 'action' message: ", gameStatus);
    });
    this.onMessage('submit', (client, { answer, testResult }) => {
      this.dispatcher.dispatch(new AddAnswer(), {
        clientId: client.id,
        clientAnswer: answer,
        testResult: testResult,
      });
    });
    this.onMessage('failvote', (client, { solutionId }) => {
      this.dispatcher.dispatch(new AddVote(), {
        //the client above is the info for the person voting, the solutionId is the id of the person they are voting for. We want to access the object for the person whose answer is voted. i.e. the SolutionId
        clientId: solutionId,
        failVote: 1,
      });
    });
    this.onMessage('passvote', (client, { solutionId }) => {
      this.dispatcher.dispatch(new AddVote(), {
        clientId: solutionId,
        passVote: 1,
      });
    });

    console.log('Room Created');
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
