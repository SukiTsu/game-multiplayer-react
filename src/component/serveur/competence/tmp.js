import { getCompetenceList } from './RadomCompetence.js';

export class WaveCompetence {
    constructor() {
      this.listCompetence = [];
    }

    run(payload, meta, clients){
        const nomCompetence = payload.nomCompetence;
        const sousTitre = meta?.sousTitre;
        console.log("test:"+sousTitre)
        if (sousTitre === "toServeurCompetenceChoice"){
          console.log("Serveur: Compétence choisie :", nomCompetence);
          for (const client of clients.keys()) {
            client.send(JSON.stringify({ type: 'toClientChoiceCompetence', payload: {nomCompetence}}));
          }
        }
    }

    newWave(nbJoueur){
        this.listCompetence = getCompetenceList(nbJoueur)
    }
    getCompetenceList(){
        return this.listCompetence;
    }
    removeCompetence(nom){
        const index = this.listCompetence.findIndex(c => c.nom === nom);
        if (index !== -1) {
            this.listCompetence.splice(index, 1);
        }
    }
}