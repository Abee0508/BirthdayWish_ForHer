import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // ✅ Important for Vercel static hosting
  plugins: [react()],
  server: {
    proxy: {
      "/birthday-final/send-questionnaire.php": "http://localhost"
    }
  }
});
