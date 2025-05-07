import { WebSocketServer } from 'ws';
import http from 'http';
import { LobbyPhase } from './component/serveur/lobby/lobby.js';
import { GamePhase } from './component/utils/enum.js';
import { CompetencePhase } from './component/serveur/competence/WaveCompetence.js';

const PORT = process.env.PORT || 3001;
const server = http.createServer();
const wss = new WebSocketServer({ server });
export const servData = {
  clients: new Map(), // socket => { pseudo }
  phase:GamePhase.LOBBY
}

server.listen(PORT, () => {
  console.log(`✅ Serveur WebSocket lancé sur port ${PORT}`);
});

const lobby = new LobbyPhase(GamePhase.COMPETENCE);
const competence = new CompetencePhase(GamePhase.MINIGAME)

function updatePhase(newPhase) {
  phase = newPhase;
  console.log("Nouvelle phase :", newPhase);
}

/**
 * await wait(3000);
            console.log("✅ Action exécutée !");
            client.send(JSON.stringify({ type: 'toClientGetCompetence', payload }));
 */

wss.on('connection', (socket) => {
  console.log('🔌 Un joueur est connecté');

  socket.on('message', (data) => {
    try {
      const parsed = JSON.parse(data);

    if (servData.phase === GamePhase.LOBBY) {
      lobby.handleMessage(socket, parsed)
    } else if (servData.phase === GamePhase.COMPETENCE) {
      competence.handleChoice(socket,parsed);
    }
  } catch (err) {
    console.error('❌ Erreur de parsing:', err);
  }
  });

  socket.on('close', () => {
    const info = servData.clients.get(socket);
    console.log(`❌ ${info?.pseudo ?? 'Un joueur'} s'est déconnecté`);
    servData.clients.delete(socket);
  });
});
