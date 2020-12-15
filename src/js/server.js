const http = require('http');
const Koa = require('koa');

const app = new Koa();
const WS = require('ws');

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port);
const wsServer = new WS.Server({ server });

const names = [];

wsServer.on('connection', (ws) => {
  const errCallback = (err) => {
    if (err) {
      console.log(err);
    }
  };

  ws.on('message', (msg) => {
    if (names.find((name) => name === msg)) {
      ws.send('Такое имя уже есть!', errCallback);
    } else {
      ws.send('Имя свободно, заходи!', errCallback);
      names.push(msg);
    }
  });
});
