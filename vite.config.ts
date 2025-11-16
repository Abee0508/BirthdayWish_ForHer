import { defineConfig, loadEnv, Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Mock API middleware for local development
function mockApiMiddleware(): Plugin {
  return {
    name: "mock-api",
    apply: "serve",
    configureServer(server: any) {
      return () => {
        server.middlewares.use("/api", (req: any, res: any, next: any) => {
          // Mock /api/upload
          if (req.url === "/upload" && req.method === "POST") {
            console.log("📤 Mock upload response (local dev)");
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                url: "https://mock-blob-url.vercel-storage.com/mock-file.jpg",
                downloadUrl:
                  "https://mock-blob-url.vercel-storage.com/mock-file.jpg",
              })
            );
            return;
          }
          // Mock /api/send-questionnaire
          if (req.url === "/send-questionnaire" && req.method === "POST") {
            let body = "";
            req.on("data", (chunk: any) => {
              body += chunk.toString();
            });
            req.on("end", () => {
              try {
                const data = JSON.parse(body);
                console.log(
                  "✉️ Mock email would be sent to: tahafaisahussian62@gmail.com"
                );
                console.log("📋 Email data:", JSON.stringify(data, null, 2));
              } catch (e) {
                console.error("Failed to parse request body:", e);
              }
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  success: true,
                  message:
                    "Form submitted (mock). Check terminal for email data.",
                })
              );
            });
            return;
          }
          next();
        });
      };
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env file based on `mode` in the current working directory.
  loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), mockApiMiddleware()],
  };
});
