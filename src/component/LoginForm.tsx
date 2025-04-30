import { useState } from 'react';

export default function LoginForm({ onLogin }: { onLogin: (pseudo: string) => void }) {
  const [pseudo, setPseudo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pseudo.trim()) {
      onLogin(pseudo.trim());
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ minWidth: '300px' }}>
        <h2 className="text-center mb-4">Bienvenue</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="pseudo" className="form-label">Entrez votre pseudo</label>
            <input
              id="pseudo"
              type="text"
              className="form-control"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Rejoindre le jeu</button>
        </form>
      </div>
    </div>
  );
}
