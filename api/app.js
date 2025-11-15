import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getArticles } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/articles", async (_req, res) => {
  const articles = await getArticles();
  res.json(articles);
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
