import { WaveCompetence } from "../competence/WaveCompetence";

export class WaveLobby {
    constructor(){
        this.waveCompetence = new WaveCompetence()
    }
    run(socket){
        const player = clients.get(socket);
        if (player) {
          player.ready = true;
          broadcastPlayers();

          const allReady = Array.from(clients.values()).every(p => p.ready);

          // Si tout les joueurs sont prêt
          if (allReady) {
            console.log('✅ Tous les joueurs sont prêts !');
            
            // Envoit au coté client
            waveCompetence.newWave(clients.size);
            const competences = waveCompetence.getCompetenceList();
            const payload = { competences };
            for (const client of clients.keys()) {
              if (client.readyState === client.OPEN) {
                client.send(JSON.stringify({ type: 'allReady' }));
                async function startAction() { 
                  console.log("⏳ Attente de 3 secondes...");

                  await wait(3000)
                  console.log("✅ Action exécutée !");
                  client.send(JSON.stringify({ type: 'toClientGetCompetence', payload }));
                }
                startAction()
                
              }
            }
            
          }
          
        }
    }
}