import { Competence } from './Competence.js';
import { EffetType } from './Competence.js'
import { StatCible } from './Competence.js'

class CompetenceBonus extends Competence {
    constructor(nom, niveau, delai, duree, effetsBase) {
        const effetsAvecNiveau = effetsBase.map(effet => ({
        ...effet,
        valeur: effet.valeur + niveau * (effet.augmentationParNiveau || 1),
        description: `Augmente ${effet.cible} de ${effet.valeur + niveau * (effet.augmentationParNiveau || 1)}%`,
        }));

        super(nom, niveau, delai, effetsAvecNiveau, EffetType.BONUS);
        this.duree = duree;
    }

    toJSON() {
      return {
        ...super.toJSON(),
        duree: this.duree
      };
    }

    static fromJSON(data) {
      return new CompetenceBonus(
        data.nom,
        data.niveau,
        data.delai,
        data.duree,
        data.effets
      );
    }

    getDescription() {
        return `${this.nom} (Niveau ${this.niveau}) : ${this.effets.map(e => e.description).join(', ')} pendant ${this.duree} tours (délais: ${this.delai} tours)`;
      }
  }

const buffCritique = new CompetenceBonus('Concentration', 1, 3, 2,[
  {
    type: EffetType.BONUS,
    cible: StatCible.TAUX_CRIT,
    valeur: 15, // valeur de base
    augmentationParNiveau: 10,
  },
  {
    type: EffetType.BONUS,
    cible: StatCible.DEGAT_CRIT,
    valeur: 30,
    augmentationParNiveau: 20,
  },
]);

const renforcementTotal = new CompetenceBonus('Renforcement total', 1, 3, 2,[
  {
    type: EffetType.BONUS,
    cible: StatCible.PV,
    valeur: 20,
    augmentationParNiveau: 5,
  },
  {
    type: EffetType.BONUS,
    cible: StatCible.ATTAQUE,
    valeur: 15,
    augmentationParNiveau: 5,
  },
  {
    type: EffetType.BONUS,
    cible: StatCible.DEFENSE,
    valeur: 15,
    augmentationParNiveau: 5,
  },
]);

export const listBonus = [renforcementTotal,buffCritique]
/*
console.log(`----------------------------------------
    Bonus
---------------------------------------- `)
console.log(buffCritique.getDescription());
console.log(renforcementTotal.getDescription());
*/