import { servData } from "../../index.js";

export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function getPlayerSocket(){
    return Array.from(servData.clients.values()).map((p) => p.player) 
}
export function getPlayerPseudoComptence(){
    return Array.from(servData.clients.values()).map((p) => ({
        pseudo: p.player.pseudo,
        listCompetence: p.player.listCompetence
      }))
}
export function getPlayerSpeudo(){
    return Array.from(servData.clients.values()).map((p) => p.player.pseudo) 
}