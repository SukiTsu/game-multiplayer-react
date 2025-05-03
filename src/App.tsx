import { useEffect, useRef, useState } from 'react';
import Lobby from './component/Lobby';
import ComponentCompetence from './component/client/ComponentCompetence';

function App() {
  const [phase, setPhase] = useState<'lobby' | 'competence'>('lobby');
  const [socketReady, setSocketReady] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const socket = new WebSocket('ws://localhost:3001');
      socketRef.current = socket;

      socket.onopen = () => {
        console.log('✅ WebSocket connecté');
        setSocketReady(true);
      };

      socket.onerror = (err) => {
        console.error('❌ Erreur WebSocket:', err);
      };

      socket.onclose = () => {
        console.warn('⚠️ WebSocket fermé');
      };
    }, 2000); // ← Attente de 2000 ms (2 secondes)

    return () => {
      clearTimeout(timeout); // Nettoyage si le composant se démonte avant le délai
      socketRef.current?.close();
    };
  }, []);

  return (
    <>
      {!socketReady && (
        <div className="text-center mt-5">
          <h2>⏳ Connexion au serveur en cours...</h2>
        </div>
      )}
      {phase === 'lobby' && socketRef.current && socketReady && (
        <Lobby socket={socketRef.current} onStartGame={() => setPhase('competence')} />
      )}
      {phase === 'competence' && socketRef.current && socketReady &&<ComponentCompetence socket={socketRef.current}/>}
    </>
  );
}

export default App;
