const schema = require('@colyseus/schema');
const command = require('@colyseus/command');
const Schema = schema.Schema;

class GameStatusSchema extends Schema {
  constructor() {
    super();
    this.gameStatus = '';
  }
}
schema.defineTypes(GameStatusSchema, {
  gameStatus: 'string',
});

class updateGameStatus extends command.Command {
  execute({ gameStatus }) {
    const newStatus = new GameStatusSchema();
    newStatus.gameStatus = gameStatus;
  }
}

module.exports = { GameStatusSchema, updateGameStatus };
