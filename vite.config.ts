import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ws': {
        target: 'ws://https://game-multiplayer-react.vercel.app/',  // Le port de ton serveur WebSocket
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
