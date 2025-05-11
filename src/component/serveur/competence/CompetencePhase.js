// competence.js

import { servData } from '../../../index.js';
import { getPlayerPseudoComptence, getPlayerSocket } from '../../utils/utils.js';
import { getRandomCompetenceList } from './RadomCompetence.js';

export class CompetencePhase {
  constructor(changeEtat) {
    this.changeEtat = changeEtat;
    this.init = false
    this.competenceList = [];
  }

  sendCompetences() {
    const payload = { 
      competences: this.competenceList, 
      players: getPlayerPseudoComptence()
    };
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
      this.sendCompetences();
    }
    if (parsed.type === "toServeurCompetenceChoice"){
      const { payload } = parsed;
      const socketPlayer = servData.clients.get(socket); // {socket, {player: ...}}
      const player = socketPlayer.player;
      const nomCompetence = payload.nomCompetence;
      console.log("reception: "+nomCompetence);
      const index = this.competenceList.findIndex(c => c.nom === nomCompetence);
      if (index !== -1 && player.canAddCompetence()) {
        player.addCompetence(this.competenceList[index])
        const [removed] = this.competenceList.splice(index, 1);
        console.log(`${player.pseudo} a choisie: "${removed.nom}"}}`);
        this.sendCompetences();
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

export default new CompetencePhase();
