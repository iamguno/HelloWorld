import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();

  app.use(express.static(join(__dirname, "..", "public")));

  app.get("/api/hello", (req, res) => {
    const name = typeof req.query.name === "string" && req.query.name.trim()
      ? req.query.name.trim()
      : "World";
    res.json({ message: `Hello, ${name}!` });
  });

  app.get("/healthz", (req, res) => {
    res.json({ status: "ok" });
  });

  return app;
}
