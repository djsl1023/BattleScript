const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const command = require('@colyseus/command');

class MessagesSchema extends Schema {
  constructor() {
    super();
    this.username;
    this.message = '';
  }
}
schema.defineTypes(MessagesSchema, {
  username: 'string',
  message: 'string',
});

class AddMessage extends command.Command {
  execute({ username, message }) {
    const newMessage = new MessagesSchema();
    newMessage.message = message;
    newMessage.username = username;
    this.state.messages.push(newMessage);
  }
}

module.exports = { MessagesSchema, AddMessage };
