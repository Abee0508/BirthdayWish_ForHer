import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // ✅ Vercel / static deploy ke liye fix
  plugins: [react()],
  server: {
    proxy: {
      '/birthday-final/send-questionnaire.php': 'http://localhost',
    },
  },
})
