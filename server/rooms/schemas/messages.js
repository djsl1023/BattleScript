const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const command = require('@colyseus/command');

class MessagesSchema extends Schema {
  constructor() {
    super();
    // this.id;
    this.message = '';
  }
}
schema.defineTypes(MessagesSchema, {
  message: 'string',
});

class AddMessage extends command.Command {
  execute({ message }) {
    const newMessage = new MessagesSchema();
    newMessage.message = message;
    this.state.users.set(newMessage);
  }
}

module.exports = { MessagesSchema, AddMessage };
