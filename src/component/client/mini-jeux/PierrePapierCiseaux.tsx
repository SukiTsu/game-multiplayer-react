import React, { useEffect, useState } from 'react';


interface CompetenceProps {
  socket: WebSocket;
}

interface Player {
  pseudo: string;
  choix: string;
}

const ComponentPierrePapierCiseau:React.FC<CompetenceProps> = ({ socket }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [bot, setBot] = useState<Player>();

  useEffect(() => {
    socket.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);
      switch (type) {
        case 'toClientGetChoixBot':
          setBot(payload.bot)
          setPlayers(payload.players)
          console.log("recu client: "+payload.bot+", "+payload.players);
          break;
    
        case 'toClientChoiceCompetence':
          const { nomCompetence } = payload;
          console.log("Un utilisateur a choisi: "+nomCompetence)
          break;
      }
    };
  }, [socket]);
  
  const handleChoice = (nomCompetence: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'toServeurCompetenceChoice',
        payload: { nomCompetence }
      }));
    }
  };
  

  return (
    <div>
      <h2>Pierre Papier Ciseau</h2>
      <ul>
        {players.map((p, i) => (
          <li key={i}>
            <strong>{p.pseudo}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComponentPierrePapierCiseau;