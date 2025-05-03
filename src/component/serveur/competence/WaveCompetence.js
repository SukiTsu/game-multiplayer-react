import { getCompetenceList } from './RadomCompetence.js';

export class WaveCompetence {
    constructor() {
      this.listCompetence = [];
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