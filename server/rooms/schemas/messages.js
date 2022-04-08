const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const command = require('@colyseus/command');

class MessagesSchema extends Schema {
  constructor() {
    super();
    this.username;
    this.message = '';
    this.clientId;
  }
}
schema.defineTypes(MessagesSchema, {
  username: 'string',
  message: 'string',
  clientId: 'string',
});

class AddMessage extends command.Command {
  execute({ username, message, clientId }) {
    const newMessage = new MessagesSchema();
    newMessage.message = message;
    newMessage.username = username;
    newMessage.clientId = clientId;
    this.state.messages.push(newMessage);
  }
}

module.exports = { MessagesSchema, AddMessage };
