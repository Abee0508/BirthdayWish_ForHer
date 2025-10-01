import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import type { Connect } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react()
    ],
  };
});
