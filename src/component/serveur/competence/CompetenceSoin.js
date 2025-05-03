import { Competence } from './Competence.js';
import { EffetType } from './Competence.js'
import { StatCible } from './Competence.js'

class CompetenceSoin extends Competence {
constructor(nom, niveau, soinBase, delai, effets = []) {
    super(nom, niveau, delai,[
    { type: EffetType.SOIN, valeur: soinBase + niveau * 10, description: `Soigne ${soinBase + niveau * 10} PV` },
    ...effets,
    ], EffetType.SOIN);
}
}



const soinDirect = new CompetenceSoin('Soin direct', 1, 80, 3,[
{
    type: EffetType.SOIN,
    cible: StatCible.PV,
    valeur: 80,
    augmentationParNiveau: 20,
    description: 'à la cible'
},
]);

const soinGroupe = new CompetenceSoin('Onde régénérante', 1, 50, 3,[
{
    type: EffetType.SOIN,
    cible: 'groupe',
    valeur: 50,
    augmentationParNiveau: 10,
    description: 'à tout les alliés'
},
]);

export const listSoin = [soinDirect,soinDirect]

  /*
  console.log(`----------------------------------------
                      soin
  ---------------------------------------- `)
  console.log(soinGroupe.getDescription());
  console.log(soinDirect.getDescription());
  */