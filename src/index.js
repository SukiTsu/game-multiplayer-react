import { WebSocketServer } from 'ws';

const port = process.env.PORT || 3001;
const server = new WebSocketServer({ port });
console.log('✅ Serveur WebSocket lancé sur wss://game:3001');

const clients = new Set();

server.on('connection', (socket) => {
  clients.add(socket);
  console.log('🔌 Un joueur est connecté');

  socket.on('message', (data) => {
    console.log('📨 Reçu:', data);

    for (const client of clients) {
      if (client !== socket && client.readyState === socket.OPEN) {
        client.send(data);
      }
    }
  });

  socket.on('close', () => {
    clients.delete(socket);
    console.log('❌ Un joueur s\'est déconnecté');
  });
});
