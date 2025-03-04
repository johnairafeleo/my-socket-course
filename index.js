// 1.package

import express from 'express';
import http from 'http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

// 2.instances
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 3.serving HTML
const __dirname = dirname(fileURLToPath(import.meta.url));
app.get('/', (req, res) => res.sendFile(join(__dirname, 'index.html')));

// 4.Define a connection event handler
io.on('connection', (client) => {
  console.log('User Connected To (Server) ✅');

  client.on('new message', (message) => {
    console.log(message);
  });

  client.on('disconnect', () => {
    console.log('User Disconnected From (Server) ❌');
  });
});

// 5. Start the server
const PORT = 3000;

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
