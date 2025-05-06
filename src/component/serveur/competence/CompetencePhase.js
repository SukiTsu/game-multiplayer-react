/*
import { getCompetenceList } from './RadomCompetence.js';

class CompetencePhase {
  constructor(nbJoueurs) {
    this.nbJoueurs = nbJoueurs;
    this.competenceList = getCompetenceList(nbJoueurs); // 2 compétences * nbJoueurs
    this.choixJoueurs = new Map(); // socket => nomCompétence
  }

  getCompetences() {
    return this.competenceList;
  }

  enregistrerChoix(socket, nomCompetence) {
    const index = this.competenceList.findIndex(c => c.nom === nomCompetence);
    if (index !== -1) {
      this.competenceList.splice(index, 1); // retire UNE occurrence
      this.choixJoueurs.set(socket, nomCompetence);
      return true;
    }
    return false;
  }

  tousOntChoisi() {
    return this.choixJoueurs.size === this.nbJoueurs;
  }

  getChoixJoueurs() {
    return Array.from(this.choixJoueurs.entries()).map(([socket, nom]) => ({ socket, nom }));
  }
}

export default { CompetencePhase };
*/