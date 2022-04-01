const schema = require('@colyseus/schema');
const command = require('@colyseus/command');
const Schema = schema.Schema;

//Schema
class UserSchema extends Schema {
  constructor() {
    super();
    this.username = '';
    this.isHost = false;
    this.avatarURL = '';
    this.correctPoints = 0;
    this.incorrectPoints = 0;
  }
}

schema.defineTypes(UserSchema, {
  username: 'string',
  isHost: 'boolean',
  avatarURL: 'string',
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
    //get random avatar
    let avatarURL = `./Images/Avatars/avatar${
      Math.floor(Math.random() * (12 - 1)) + 1
    }.png`;

    //check if avatar is in use
    const usersListAvatars = Object.keys(this.state.users).map((userId) => {
      return this.state.users[userId].avatarURL;
    });
    while (usersListAvatars.includes(avatarURL)) {
      avatarURL = `./Images/Avatars/avatar${
        Math.floor(Math.random() * (12 - 1)) + 1
      }.png`;
    }
    //if not, add to user
    newUser.avatarURL = avatarURL;

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
    if (this.state.failAnswers[clientId]) {
      this.state.failAnswers.delete(clientId);
    }
    if (this.state.passAnswers[clientId]) {
      this.state.passAnswers.delete(clientId);
    }
    if (this.state.failVotes[clientId]) {
      this.state.failVotes.delete(clientId);
    }
    if (this.state.passVotes[clientId]) {
      this.state.passVotes.delete(clientId);
    }
  }
}

module.exports = { UserSchema, AddUser, RemoveUser };
