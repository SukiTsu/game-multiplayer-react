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


const ComponentCompetence:React.FC<CompetenceProps> = ({ socket }) => {
  const [competences, setCompetences] = useState<Competence[]>([]);

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'waveCompetence') {
        console.log('✅ Compétences reçues :', data.waveCompetence.listCompetence); // ← ICI
        setCompetences(data.waveCompetence.listCompetence);
      }
      if (data.type === 'competenceChoice') {
        const nom = data.nomCompetence;
        console.log('✅ Compétences choisie par un utilisateur :', nom);
        setCompetences((prev) => {
          const index = prev.findIndex(c => c.nom === nom);
          if (index !== -1) {
            const clone = [...prev];
            clone.splice(index, 1);
            return clone;
          }
          return prev;
        });
      }
    };
  }, [socket]);
  
  const handleChoice = ({ nomCompetence }: { nomCompetence: string }) => {
    socket.send(JSON.stringify({ type: 'competenceChoice', nomCompetence }));
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
            <button onClick={() => handleChoice({ nomCompetence: c.nom })}>Selectionner</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComponentCompetence;