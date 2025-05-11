import { getPlayerSpeudo } from "../../utils/utils.js";
import { JoueurPierrePapierCiseau } from "./Joueur.js";

const ChoixPierrePapierCiseau
 = Object.freeze({
    PIERRE: 'pierre',
    PAPIER: 'papier',
    CISEAU: 'ciseau'
  });

export class GamePierrePapierCisaeu {
    
    constructor(){
        const pseudo = getPlayerSpeudo();
        this.joueurs = pseudo.map((p) => new JoueurPierrePapierCiseau(p));
        this.bot = new JoueurPierrePapierCiseau("bot");
        this.niveau = 0;
        this.nbDuel = 0;
    }

    setChoixBot(){
        const valeurs = Object.values(ChoixPierrePapierCiseau);
        const choixAleatoire = valeurs[Math.floor(Math.random() * valeurs.length)];
        this.bot.setChoix(choixAleatoire);
    }

    duel(){
        this.nbDuel++;
        if (this.joueur.choix === this.bot.choix){
            return 0;
        }
        const choixGagnant = this.getChoixGagnant(this.bot.choix)
        if (choixGagnant === this.joueur.choix){
            return 1;
        }
        return -1;
    }

    getChoixGagnant(choix1){
        if(choix1 === ChoixPierrePapierCiseau.PAPIER){
            return ChoixPierrePapierCiseau.PIERRE;
        } else if (choix1 === ChoixPierrePapierCiseau.PIERRE){
            return ChoixPierrePapierCiseau.CISEAU;
        } return ChoixPierrePapierCiseau.PAPIER;
    }
    
}