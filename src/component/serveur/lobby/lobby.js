// lobby.js

import { servData } from "../../../index.js";
import { Player } from "../../utils/player.js";
import { getPlayerSocket } from "../../utils/utils.js";

export class LobbyPhase {
  constructor(changePhase) {
    this.changePhase = changePhase;
  }

  handleMessage(socket, parsed) {
    if (parsed.type === 'join') {
      const pseudo = parsed.pseudo || 'Anonyme';
      const player = new Player(pseudo)
      servData.clients.set(socket, { player: player });
      console.log(`👤 ${pseudo} a rejoint le jeu`);
      this.broadcastPlayers();
    }

    if (parsed.type === 'ready') {
      const socketPlayer = servData.clients.get(socket);
      if (socketPlayer) {
        const player = socketPlayer.player;
        player.setReady();
        console.log(player.pseudo+" est prêt!")
        this.broadcastPlayers();

        const allReady = Array.from(servData.clients.values()).every(p => p.player.ready);
        if (allReady) {

          console.log('✅ Tous les joueurs sont prêts !');
          servData.phase = this.changePhase;
          this.sendClient();
          console.log("Phase changée à :", servData.phase);
        }
      }
    }
  }

  broadcastPlayers() {
    const players = getPlayerSocket();
    const message = JSON.stringify({ type: 'players', players });

    for (const client of servData.clients.keys()) {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    }
  }

  sendClient(){
    for (const client of servData.clients.keys()) {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ type: 'allReady' }));  
      }
    }
  }
}
