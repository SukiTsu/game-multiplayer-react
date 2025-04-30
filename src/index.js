import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 3001;

// Création du serveur HTTP
const server = createServer();

// Création du serveur WebSocket attaché au serveur HTTP
const wss = new WebSocketServer({ server });

// Écoute du serveur HTTP
server.listen(PORT, () => {
  console.log(`✅ Serveur WebSocket lancé sur port ${PORT}`);
});

wss.on('connection', (socket) => {
  console.log('🔌 Un joueur est connecté');

  socket.on('message', (data) => {
    console.log('📨 Reçu:', data.toString());

    // Re-transmet à tous les autres clients
    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === socket.OPEN) {
        client.send(data);
      }
    });
  });

  socket.on('close', () => {
    console.log('❌ Un joueur s\'est déconnecté');
  });
});
