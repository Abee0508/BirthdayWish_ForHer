import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
  proxy: {
    '/birthday-final/send-questionnaire.php': 'http://localhost'
  }
}
});