// lobby.js

import { servData } from "../../../index.js";
import { Player } from "../../utils/player.js";
import { getPlayerSocket, wait } from "../../utils/utils.js";
import { GamePierrePapierCisaeu } from "./PierrePapierCiseau.js";

export class PierrePapierCiseauPhase {
  constructor(changePhase) {
    this.changePhase = changePhase;
    this.game = null;
  }

  handleMessage(socket, parsed) {
    if (!this.game) this.game = new GamePierrePapierCisaeu();
    this.newManche();

  }

  async newManche(){
    this.game.setChoixBot();
    await wait(1000);
    this.sendClient();
  }

  sendClient() {
    const payload = { 
      bot: this.game.bot,
      players : this.game.joueurs
    };
    const message = JSON.stringify({ type: 'toClientGetChoixBot', payload });
    console.log("message "+message);
    for (const client of servData.clients.keys()) {
      if (client.readyState === client.OPEN) {
        client.send(message);
        console.log("send message");
      }
    }
  }

}
