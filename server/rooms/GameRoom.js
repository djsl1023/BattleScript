const colyseus = require('colyseus');

class GameRoom extends colyseus.Room {
  // When room is initialized
  onCreate(options) {
    console.log('Room Created');
  }

  // Authorize client based on provided options before WebSocket handshake is complete
  // onAuth(client, options, request) {}

  // When client successfully join the room
  onJoin(client, options, auth) {
    console.log('hello', client);
  }

  // When a client leaves the room
  onLeave(client, consented) {}

  // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
  onDispose() {}
}

module.exports = GameRoom;
