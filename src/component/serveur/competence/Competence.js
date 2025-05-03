export const EffetType = {
  DEGAT: 'degat',
  SOIN: 'soin',
  STAT: 'stat',
  PENETRATION: 'penetration',
  MALUS: 'malus',
  BONUS: 'bonus',
};

export const StatCible = {
  ATTAQUE: 'attaque',
  DEFENSE: 'defense',
  PV: 'pv',
  TAUX_CRIT: 'taux_crit',
  DEGAT_CRIT: 'degat_crit',
};

export class Competence {
  constructor(nom, niveau, delai, effets, type) {
    this.nom = nom;
    this.niveau = niveau;
    this.delai = delai;
    this.effets = effets; // tableau d’objets effets
    this.type = type;
    this.tourActive = 0;
  }

  active(){
    if(this.tourActive !=0) return(`Activation impossible, encore ${this.tourActive} tours avant de pouvoir être utilisé`);
    this.tourActive = this.delai;
    return;
  }

  debutTour(){
    if (this.tourActive>0) this.tourActive--
    return;
  }

  getDescription() {
    return `${this.nom} (Niveau ${this.niveau}) : ${this.effets.map(e => e.description).join(', ')} (délais: ${this.delai} tours)`;
  }
}