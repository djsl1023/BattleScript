const schema = require('@colyseus/schema');
const Sequelize = require('sequelize');
const Schema = schema.Schema;
const command = require('@colyseus/command');

class VoteSchema extends Schema {
  constructor() {
    super();
    this.clientId;
    this.votes = 0;
  }
}
schema.defineTypes(VoteSchema, {
  clientId: 'string',
  votes: 'number',
});

//Commands

class AddVotes extends command.Command {
  execute({ clientId, failVote, passVote }) {
    console.log('addvotes');
    if (failVote) {
      //accessing the already created object from the failVotes map

      let vote = this.state.failVotes.get(clientId);
      console.log(this.state.failVotes);
      //incrementing the vote count
      vote.votes = vote.votes + 1;
      //setting the updated object with the new vote count on game state
      this.state.failVotes.set(clientId, vote);
    } else if (passVote) {
      let vote = this.state.passVotes.get(clientId);
      vote.votes = vote.votes + 1;

      this.state.passVotes.set(clientId, vote);
    }
  }
}

module.exports = { VoteSchema, AddVotes };
