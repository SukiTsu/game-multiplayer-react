import { WebSocketServer } from 'ws';
import http from 'http';

const PORT = process.env.PORT || 3001;
const server = http.createServer();
const wss = new WebSocketServer({ server });

server.listen(PORT, () => {
  console.log(`✅ Serveur WebSocket lancé sur port ${PORT}`);
});

const clients = new Map(); // socket => { pseudo }

function broadcastPlayers() {
  const players = Array.from(clients.values());
  const message = JSON.stringify({ type: 'players', players });

  for (const client of clients.keys()) {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  }
}

wss.on('connection', (socket) => {
  console.log('🔌 Un joueur est connecté');

  socket.on('message', (data) => {
    try {
      const parsed = JSON.parse(data);

      // Actions des joueurs
      if (parsed.type === 'join') {
        clients.set(socket, { pseudo: parsed.pseudo, readu: parsed.false });
        console.log(`👤 ${parsed.pseudo} a rejoint le jeu`);
        broadcastPlayers();
      }

      if (parsed.type === 'ready') {
        const player = clients.get(socket);
        if (player) {
          player.ready = true;
          broadcastPlayers();
        }
      }


    } catch (err) {
      console.error('❌ Erreur de parsing:', err);
    }
  });

  socket.on('close', () => {
    const info = clients.get(socket);
    console.log(`❌ ${info?.pseudo ?? 'Un joueur'} s'est déconnecté`);
    clients.delete(socket);
    broadcastPlayers();
  });
});
