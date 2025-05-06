import React, { useEffect, useState } from 'react';


interface CompetenceProps {
  socket: WebSocket;
}

interface Player {
  pseudo: string;
  ready: boolean;
}
interface Effet {
  type: string;
  cible: string;
  valeur: number;
  description: string;
}

interface Competence {
  nom: string;
  niveau: number;
  delai: number;
  type: string;
  effets: Effet[];
}

interface Player {
  pseudo: string;
  competences: Competence[]
}

const ComponentCompetence:React.FC<CompetenceProps> = ({ socket }) => {
  const [competences, setCompetences] = useState<Competence[]>([]);
  const [player, setPlayer] = useState<Player[]>([]);

  useEffect(() => {
    socket.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case 'toClientGetCompetence':
          setCompetences(payload.competences);
          break;
    
        case 'toClientChoiceCompetence':
          const { nomCompetence } = payload;
          console.log("Un utilisateur a choisi: "+nomCompetence)
          setCompetences(prev => {
            const index = prev.findIndex(c => c.nom === nomCompetence);
            if (index !== -1) {
              const clone = [...prev];
              clone.splice(index, 1); // Supprime une occurrence
              return clone;
            }
            return prev;
          });
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
      <h2>🧠 Compétences reçues</h2>
      <ul>
        {competences.map((c, i) => (
          <li key={i}>
            <strong>{c.nom}</strong> (Niveau {c.niveau}) – Type: {c.type}
            <ul>
              {c.effets.map((e, j) => (
                <li key={j}>{e.description}</li>
              ))}
            </ul>
            <button onClick={() => handleChoice(c.nom)}>Selectionner</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComponentCompetence;