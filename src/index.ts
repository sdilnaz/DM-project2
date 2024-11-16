import express from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';

dotenv.config();

import gptRouter from "./gpt/gptRoutes";
import geminiRouter from "./gemini/geminiRoutes";

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/gpt", gptRouter);
app.use("/api/gemini", geminiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
