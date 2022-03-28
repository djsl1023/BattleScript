const schema = require('@colyseus/schema');
const Sequelize = require('sequelize');
const Schema = schema.Schema;
const command = require('@colyseus/command');

//Commands

class AddVotes extends command.Command {
  execute({ clientId, failVote, passVote }) {
    console.log('addvotes');
    if (failVote) {
      //accessing the already created object from the failVotes map

      let vote = this.state.failVotes.get(clientId);
      //incrementing the vote count
      vote = vote + 1;
      //setting the updated object with the new vote count on game state
      this.state.failVotes.set(clientId, vote);
    } else if (passVote) {
      let vote = this.state.passVotes.get(clientId);
      vote = vote + 1;

      this.state.passVotes.set(clientId, vote);
    }
  }
}

module.exports = { AddVotes };
