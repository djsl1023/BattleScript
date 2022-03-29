const schema = require('@colyseus/schema');
const command = require('@colyseus/command');
const Schema = schema.Schema;

//Schema
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
  correctPoints: 'number',
  incorrectPoints: 'number',
});

//Commands
class AddUser extends command.Command {
  execute({ clientId, username }) {
    //when client successfully joins, Add a user instance for them
    const newUser = new UserSchema();
    //take username from options, and set newuser's username
    newUser.username = username;
    //If this is the first user, make them a host
    if (this.state.users.size === 0) {
      newUser.isHost = true;
      this.state.hostKey = clientId;
    }
    //set new user in game state
    /**users: {client.id, newUser,
     *         client2.id, newUser,
     *          } */
    this.state.users.set(clientId, newUser);
  }
}
class RemoveUser extends command.Command {
  execute({ clientId }) {
    this.state.users.delete(clientId);
  }
}

module.exports = { UserSchema, AddUser, RemoveUser };
