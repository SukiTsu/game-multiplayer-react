export class Player{
    constructor(pseudo){
        this.pseudo = pseudo;
        this.ready = false;
        this.listCompetence = [];
        this.pv = 100;
        this.defence = 100;
        this.attaque = 100;
    }
    setReady(){
        this.ready = true;
    }
    addCompetence(competence){
        console.log("player add:"+competence.getDescription())
        if (this.listCompetence.length === 2){
            return "Un joueur ne peux pas avoir plus de deux compétences";
        }
        this.listCompetence.push(competence);
    }
    useCompetence(nameCompetence){

    }
    print(){
        return (`${this.pseudo}: 
            (pv: ${this.pv}, def: ${this.defence}, att: ${this.attaque})\n
            Compétence: ${competence.map(c => {
                c.nom
            })}    
        `)
    }
}