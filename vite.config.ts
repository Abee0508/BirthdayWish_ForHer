import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import type { Connect } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      {
        name: "api-middleware",
        async configureServer(server) {
          const bodyParser = (await import("body-parser")).default;
          // Middleware to parse JSON request bodies with a higher limit
          server.middlewares.use(
            bodyParser.json({
              limit: "50mb", // Increase limit to handle base64 data
            })
          );

          // Middleware to handle your API route
          server.middlewares.use(
            "/api/send-questionnaire",
            async (
              req: Connect.IncomingMessage,
              res: any,
              next: Connect.NextFunction
            ) => {
              if (req.method !== "POST") return next();

              try {
                // Set environment variables for the handler from the loaded .env file
                process.env.GMAIL_USER = env.GMAIL_USER;
                process.env.GMAIL_APP_PASSWORD = env.GMAIL_APP_PASSWORD;

                const module = await server.ssrLoadModule(
                  "/api/send-questionnaire.ts"
                );
                const handler = module.default;

                // Create a VercelResponse-like object for local development
                const vercelRes = {
                  status: (code: number) => {
                    res.statusCode = code;
                    return vercelRes; // Allow chaining
                  },
                  json: (data: any) => {
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify(data));
                  },
                  setHeader: (name: string, value: string) =>
                    res.setHeader(name, value),
                  end: (data?: any) => res.end(data),
                };

                await handler(req, vercelRes); // Pass the wrapped `vercelRes`
              } catch (error) {
                console.error(error);
                res.statusCode = 500;
                res.end(error.stack);
              }
            }
          );
        },
      },
    ],
  };
});
