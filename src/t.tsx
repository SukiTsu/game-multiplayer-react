import { useEffect, useRef, useState } from 'react';
import LoginForm from './component/LoginForm';

interface player {
  pseudo:string
  ready:boolean
}

function App() {
  const [pseudo, setPseudo] = useState<string | null>(null);
  const [players, setPlayers] = useState<player[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const [ready, setReady] = useState<boolean>(false)

  
  useEffect(() => {
    if (!pseudo) return;

    const socket = new WebSocket('ws://localhost:3001');
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'join', pseudo }));
    };

    if (ready){
      socket.send(JSON.stringify({ type: 'ready', pseudo }));
    }

    // Récupération des messages du serveur
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Quand un joueur se connect
        if (data.type === 'players') {
          setPlayers(data.players);
        }

        if (data.type === 'allReady') {
          alert('🎉 Tous les joueurs sont prêts !');
          // ou déclenche une autre action dans le jeu
        }

      } catch (err) {
        console.error('❌ Erreur de parsing WebSocket:', err);
      }
    };

    socket.onclose = () => {
      console.log('❌ Déconnexion du serveur');
    };

    return () => socket.close();
  }, [pseudo]);

  return (
    <>
      {!pseudo ? (
        <LoginForm onLogin={(name) => setPseudo(name)} />
      ) : (
        <div className="container mt-5 text-center">
          <h2>👋 Salut {pseudo} !</h2>
          <button
          className="btn btn-success"
          onClick={() => {
            setReady(true);
            if (socketRef.current) {
              socketRef.current.send(JSON.stringify({ type: 'ready', pseudo }));
            }
          }}
        >
          ✅ Je suis prêt
        </button>
          <h4 className="mt-4">Joueurs connectés :</h4>
          <ul className="list-group mt-2">
            {players.map((p, i) => (
              <li key={i} className="list-group-item">{p.pseudo}({p.ready ? "Pret" : "Pas pret"})</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
