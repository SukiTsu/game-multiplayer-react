export class JoueurPierrePapierCiseau{
    constructor(pseudo){
        this.pseudo = pseudo;
        this.choix = null;
    }
    setChoix(choix){
        this.choix = choix;
    }
}