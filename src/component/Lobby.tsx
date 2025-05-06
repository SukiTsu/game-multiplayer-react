import { useEffect, useState } from 'react';

interface LobbyProps {
  socket: WebSocket;
  onStartGame: () => void;
}

interface Player {
  pseudo: string;
  ready: boolean;
}

const Lobby = ({ socket, onStartGame }: LobbyProps) => {
  const [pseudo, setPseudo] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (!submitted || !pseudo) return;

    socket.send(JSON.stringify({ type: 'join', pseudo }));

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'players') {
          setPlayers(data.players);
        }

        if (data.type === 'allReady') {
          socket.send(JSON.stringify({ type: 'change-phase' }));
          onStartGame()
        }


      } catch (err) {
        console.error('❌ Erreur de parsing:', err);
      }
    };
  }, [submitted, pseudo, socket]);

  const handleReady = () => {
    socket.send(JSON.stringify({ type: 'ready', pseudo }));
  };

  return (
    <div className="container mt-5 text-center">
      {!submitted ? (
        <>
          <h2>Entrez votre pseudo :</h2>
          <input
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            className="form-control"
          />
          <button
            onClick={() => setSubmitted(true)}
            className="btn btn-primary mt-3"
            disabled={!pseudo}
          >
            Valider
          </button>
        </>
      ) : (
        <>
          <h2>Salut {pseudo} !</h2>
          <button className="btn btn-success" onClick={handleReady}>Je suis prêt</button>

          <h4 className="mt-4">Joueurs connectés :</h4>
          <ul className="list-group mt-2">
            {players.map((p, i) => (
              <li key={i} className="list-group-item">
                {p.pseudo} {p.ready ? '✅' : '⏳'}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Lobby;
