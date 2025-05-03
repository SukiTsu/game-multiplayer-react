import { WebSocketServer } from 'ws';
import http from 'http';
import LinkedList  from './component/LinkedList.js'

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

      // Quand un joueur se mets prêt
      if (parsed.type === 'ready') {
        const player = clients.get(socket);
        if (player) {
          player.ready = true;
          broadcastPlayers();

          const allReady = Array.from(clients.values()).every(p => p.ready);

          // Si tout les joueurs sont prêt
          if (allReady) {
            console.log('✅ Tous les joueurs sont prêts !');
            
            const list = new LinkedList();
            list.append("Joueur1");
            list.append("Joueur2");
            list.append("Joueur3");
            
            list.print(); // Affiche les pseudos
            list.getIndice(0)
            list.print()
            // Envoit au coté client
            for (const client of clients.keys()) {
              if (client.readyState === client.OPEN) {
                client.send(JSON.stringify({ type: 'allReady' }));
              }
            }
            
          }
          
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
