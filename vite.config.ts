import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import type { Connect } from "vite";
import bodyParser from "body-parser";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      middleware: [
        // Middleware to parse JSON request bodies with a higher limit
        bodyParser.json({
          limit: "100mb", // Increase limit to handle base64 data
        }),
        // Middleware to handle your API route for local development
        async (
          req: Connect.IncomingMessage,
          res: any,
          next: Connect.NextFunction
        ) => {
          if (req.url?.startsWith("/api/")) {
            try {
              const module = await import(`./api/${req.url.slice(5)}.ts`);
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
              };

              await handler(req, vercelRes);
            } catch (error) {
              console.error("API middleware error:", error);
              res.statusCode = 500;
              res.end("A server error occurred.");
            }
          } else {
            next();
          }
        },
      ],
    },
  };
});
