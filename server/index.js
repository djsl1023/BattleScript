const { db } = require('./db');
const PORT = process.env.PORT || 8080;
const app = require('./app');
const seed = require('../script/seed');
const GameRoom = require('./rooms/GameRoom');
const colyseus = require('colyseus');
const http = require('http');

const gameServer = new colyseus.Server({
  server: http.createServer(app),
});
const init = async () => {
  try {
    if (process.env.SEED === 'true') {
      await seed();
    } else {
      await db.sync();
    }
    // start listening (and create a 'server' object representing our server)
    gameServer
      .define('game', GameRoom)
      .on('create', (room) => console.log('room created', room.roomId));

    gameServer.listen(PORT);
    // app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
