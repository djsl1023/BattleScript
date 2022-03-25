const schema = require('@colyseus/schema');
const Sequelize = require('sequelize');
const Schema = schema.Schema;
const command = require('@colyseus/command');

class AnswerSchema extends Schema {
  constructor() {
    super();
    this.clientId;
    this.answer = '';
    this.isCorrect = false;
  }
}
schema.defineTypes(AnswerSchema, {
  clientId: 'number',
  answer: 'string',
  isCorrect: 'boolean',
});

//Commands

class AddAnswer extends command.Command {
  execute({ roundNumber, clientId, clientAnswer, testResult }) {
    console.log(roundNumber);
    let temp = new AnswerSchema();
    temp.clientId = clientId;
    temp.answer = clientAnswer;
    temp.isCorrect = testResult;
    if (!temp.isCorrect) {
      //failVote round
      this.state.failVoting.set(clientId, temp);
      this.state.numFailVotes.set(clientId);
    } else {
      //passVote round
      this.state.passVoting.set(clientId, temp);
      this.state.numPassVotes.set(clientId);
    }
  }
}

module.exports = { AnswerSchema, AddAnswer };
