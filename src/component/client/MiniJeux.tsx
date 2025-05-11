import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CaptureGame() {
  const [power, setPower] = useState(2);
  const [ballThrown, setBallThrown] = useState(false);
  const [captured, setCaptured] = useState<boolean | null>(null);

  const handleThrow = () => {
    setBallThrown(true);
    const success = Math.random() < 0.5 + power * 0.1;
    setTimeout(() => {
      setCaptured(success);
      setBallThrown(false);
    }, 1000);
  };

  const increasePower = () => setPower((p) => Math.min(3, p + 1));
  const decreasePower = () => setPower((p) => Math.max(1, p - 1));

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      {/* Titre */}
      <h1 className="absolute top-4 left-1/2 -translate-x-1/2 text-xl font-bold">
        Niv 1: Capturer toutes les créature
      </h1>

      {/* Créature */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-32 h-16 bg-gray-300 rounded-full flex items-center justify-center shadow">
        Créature
      </div>

      {/* Boutons + / - */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <button onClick={increasePower} className="w-10 h-10 bg-white border rounded shadow">
          +
        </button>
        <button onClick={decreasePower} className="w-10 h-10 bg-white border rounded shadow">
          −
        </button>
      </div>

      {/* Jauge de puissance */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col-reverse gap-2">
        <div className={`w-6 h-6 rounded ${power >= 1 ? 'bg-red-500' : 'bg-gray-300'}`} />
        <div className={`w-6 h-6 rounded ${power >= 2 ? 'bg-yellow-400' : 'bg-gray-300'}`} />
        <div className={`w-6 h-6 rounded ${power >= 3 ? 'bg-green-500' : 'bg-gray-300'}`} />
      </div>

      {/* Balle */}
      <motion.div
        initial={{ y: 0 }}
        animate={ballThrown ? { y: -250 } : { y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 w-16 h-16 bg-red-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold shadow"
      >
        Balle
      </motion.div>

      {/* Bouton Lancer */}
      <button
        onClick={handleThrow}
        disabled={ballThrown}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 shadow"
      >
        {ballThrown ? 'Lancer...' : 'Lancer'}
      </button>

      {/* Résultat */}
      {captured !== null && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 text-lg font-semibold">
          {captured ? '🎉 Créature capturée !' : '❌ Elle s\'est échappée...'}
        </div>
      )}
    </div>
  );
}
