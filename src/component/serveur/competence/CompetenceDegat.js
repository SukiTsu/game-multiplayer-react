import { Competence } from './Competence.js';
import { EffetType } from './Competence.js'
import { StatCible } from './Competence.js'

class CompetenceDegat extends Competence {
    constructor(nom, niveau, puissanceBase, delai, effets = []) {
      super(nom, niveau, delai,[
        { type: EffetType.DEGAT, puissance: puissanceBase + niveau * 10, description: `Inflige ${puissanceBase + niveau * 10} dégâts` },
        ...effets,
      ], EffetType.DEGAT);
    }
}

/********************************************************************************
 *                      Compétences Degat
 *******************************************************************************/
const coupCritique = new CompetenceDegat('Coup critique', 1, 50, 3,[
    { type: EffetType.PENETRATION, valeur: 20, description: 'Ignore 20% de la défense' },
  ]);

const coupPuissant = new CompetenceDegat('Coup puissant', 1, 50, 3,[
    {
      type: EffetType.BONUS_TEMPORAIRE,
      cible: StatCible.TAUX_CRIT,
      valeur: 15,
      augmentationParNiveau: 5,
      description: 'Taux critiques augmenté de 15%'
    },
  ]);

export const listDegat = [coupCritique,coupPuissant]
/*
console.log(`----------------------------------------
    Degat
---------------------------------------- `)
console.log(coupCritique.getDescription());
console.log(coupPuissant.getDescription());*/