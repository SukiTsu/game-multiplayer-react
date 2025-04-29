import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: 3001 });
console.log('✅ Serveur WebSocket lancé sur ws://localhost:3001');

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
