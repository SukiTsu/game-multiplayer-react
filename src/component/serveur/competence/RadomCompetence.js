
import { listDegat } from './CompetenceDegat.js';
import { listSoin } from './CompetenceSoin.js';
import { listBonus } from './CompetenceBonus.js';
import { Competence } from './Competence.js';
import LinkedList from '../../LinkedList.js';

// Configuration des compétence selon le nombre de joueur
const configData = [
  {
    nbJoueur:1,
    degat:1,
    bonus:1,
    soin:1
  },
  {
    nbJoueur:2,
    degat:3,
    bonus:2,
    soin:2
  },
  {
    nbJoueur:3,
    degat:5,
    bonus:3,
    soin:3
  },
  {
    nbJoueur:4,
    degat:7,
    bonus:4,
    soin:4
  }
]

// Liste de toutes les compétences
const COMPETENCE_POOL = {
  degat: listDegat,
  bonus: listBonus,
  soin: listSoin
};

/**
 * Génère une liste de compétences aléatoire selon le nombre de joueurs en respectant la configuration 
 * @param {number} nbJoueur : nombre de joueur 
 * @returns {Competence[]} : liste de compétences distribuer aux joueurs
 */
export function getCompetenceList(nbJoueur) {
  console.log("Generate compétence");
  const config = configData.find(d => d.nbJoueur === nbJoueur);
  if (!config) throw new Error('❌ Configuration manquante');

  const totalToGenerate = nbJoueur * 2;
  const counts = { degat: 1, bonus: 0, soin: 0 };

  const result = []
  const ComptenceDegat = COMPETENCE_POOL["degat"][Math.floor(Math.random() * COMPETENCE_POOL["degat"].length)];
  result.push(ComptenceDegat);

  while (result.length < totalToGenerate) {
    const type = randomType(['degat', 'bonus', 'soin']);
    if (counts[type] <= config[`nbMax${type}`]) continue;

    const pool = COMPETENCE_POOL[type];
    const CompetenceClass = pool[Math.floor(Math.random() * pool.length)];
    result.push(CompetenceClass);
    counts[type]++;
  }
  return result;
}

function randomType(types) {
  return types[Math.floor(Math.random() * types.length)];
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/*
const allCompetences = getCompetenceList(2);
console.log(allCompetences.size)
allCompetences.forEach((c, i) => {
  console.log(`#${i + 1}: ${c.getDescription()}`);
});*/
