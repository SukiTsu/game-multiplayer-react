// competence.js

import { servData } from '../../../index.js';
import { getRandomCompetenceList } from './RadomCompetence.js';

export class CompetencePhase {
  constructor(changeEtat) {
    this.changeEtat = changeEtat;
    this.init = false
    this.competenceList = [];
  }

  sendCompetences(players) {
    const payload = { competences: this.competenceList, players: players };
    for (const client of servData.clients.keys()) {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ type: 'toClientGetCompetence', payload }));
      }
    }
  }

  handleChoice(socket,parsed) {
    if (!this.init){
      this.competenceList = getRandomCompetenceList(servData.clients.size);
      console.log("🧠 Liste des compétences initialisée:", this.competenceList.map(c => c.nom));
      this.init = true;
    }
    const players = servData.clients.get(socket).player;
    this.sendCompetences(players);
    if (parsed.type === "toServeurCompetenceChoice"){
      const { payload } = parsed;
      const nomCompetence = payload.nomCompetence;
      console.log("reception: "+nomCompetence);
      const index = this.competenceList.findIndex(c => c.nom === nomCompetence);
      if (index !== -1) {
        player.addCompetence(this.competenceList[index]);
        const [removed] = this.competenceList.splice(index, 1);
        console.log(`🗑️ Compétence "${removed.nom}"`);
        this.sendCompetences(player);
        if (this.competenceList.length === 0){
          this.init = false;
          console.log("Fin des compétences");
          servData.phase = this.changeEtat;
        }
      }
    }
  }

  getCompetenceList() {
    return this.competenceList;
  }
}
