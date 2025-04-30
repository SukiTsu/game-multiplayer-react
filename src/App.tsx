import { useEffect, useState, useRef } from 'react';

type Message = {
  player: string;
  text: string;
};


function App() {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const socket = new WebSocket('wss://game-multiplayer-react.onrender.com');
  socket.onopen = () => {
    console.log('✅ Connexion WebSocket ouverte');
  };
  
  socket.onmessage = (event) => {
    let messageData = event.data;
  
    // Si le message est un Blob, on doit d'abord le convertir en texte
    if (messageData instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result as string); // Le résultat est maintenant une chaîne de caractères
          console.log('📨 Message reçu:', json);
          // Traite ton message JSON ici
        } catch (error) {
          console.error('❌ Erreur lors du parsing JSON:', error);
        }
      };
      reader.readAsText(messageData);
    } else {
      // Si c'est déjà une chaîne (et donc un JSON)
      try {
        const json = JSON.parse(messageData);
        console.log('📨 Message reçu:', json);
        // Traite ton message JSON ici
      } catch (error) {
        console.error('❌ Erreur lors du parsing JSON:', error);
      }
    }
  };
  
  socket.onerror = (error) => {
    console.error('❌ Erreur WebSocket:', error);
  };
  
  socket.onclose = () => {
    console.log('❌ Connexion WebSocket fermée');
  };
  
  useEffect(() => {
    const socket = new WebSocket('wss://game-multiplayer-react.onrender.com');
    socketRef.current = socket;


    return () => socket.close();
  }, []);

  const sendMessage = () => {
    const msg = { player: 'Joueur', text: 'Hello !' };
    socketRef.current?.send(JSON.stringify(msg));
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="p-4">
      <h1>Jeu Multijoueur - Test</h1>
      <button onClick={sendMessage} className="mt-4">Envoyer un message</button>

      <ul className="mt-6">
        {messages.map((m, i) => (
          <li key={i}>{m.player} : {m.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
