const colyseus = require('colyseus');
const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const ArraySchema = schema.ArraySchema;
const MapSchema = schema.MapSchema;
const {
  models: { Lobby, User, Question },
} = require('../db');

// INDIVIDUAL STATES THAT MAKE UP GAME STATE

//Individual User Model
class UserSchema extends Schema {
  constructor() {
    super();
    this.username = '';
    this.isHost = false;
    this.correctPoints = 0;
    this.incorrectPoints = 0;
  }
}

schema.defineTypes(UserSchema, {
  username: 'string',
  isHost: 'boolean',
  correctPoints: 'int16',
  incorrectPoints: 'int16',
});

//Individual Question Model
class QuestionSchema extends Schema {
  constructor() {
    super();
    this.id;
    this.difficulty = false;
    this.title = '';
    this.question = '';
    this.testSpecs = '';
  }
}
schema.defineTypes(QuestionSchema, {
  id: 'int16',
  difficulty: 'string',
  title: 'string',
  question: 'string',
  testSpecs: 'string',
});

// OVERALL GAME STATE
class GameState extends Schema {
  constructor() {
    super();
    //Users Map with key=client.id, value=user object
    this.users = new MapSchema();
    //Questions array
    this.questions = new ArraySchema();
  }
}
schema.defineTypes(GameState, {
  users: { map: UserSchema },
  questions: [QuestionSchema],
});

class GameRoom extends colyseus.Room {
  // When room is initialized

  async onCreate(options) {
    //Set initial game state
    this.setState(new GameState());

    //Get list of questions, Will need tweaking to randomize
    const questionList = await Question.findAll();
    //Map through questions list and create new array of question instances(schemas)
    const mappedList = questionList.map((question) => {
      let temp = new QuestionSchema();
      temp.id = question.id;
      temp.difficulty = question.difficulty;
      temp.title = question.title;
      temp.question = question.question;
      temp.testSpecs = question.testSpecs;
      return temp;
    });
    //Set gamestate questions to newly created Array of Question instances(schemas)
    this.state.questions = [...mappedList];
    console.log('Room Created');
  }

  // Authorize client based on provided options before WebSocket handshake is complete
  // onAuth(client, options, request) {}

  // When client successfully join the room
  onJoin(client, options, auth) {
    //when client successfully joins, create a user instance for them
    const newUser = new UserSchema();
    //take username from options, and set newuser's username
    newUser.username = options.username;
    //If this is the first user, make them a host
    if (this.state.users.size === 0) {
      newUser.isHost = true;
    }
    //set new user in game state
    this.state.users.set(client.id, newUser);
  }

  // When a client leaves the room
  onLeave(client, consented) {}

  // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
  async onDispose() {}
}

module.exports = GameRoom;
