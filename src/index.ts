import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import getQuiz from "./features/get-quiz/index.js";
import saveQuiz from "./features/save-quiz/index.js";
import uploadQuestion from "./features/upload-question/index.js";
import { handleError } from "./utils/middleware.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json())


app.use(cors({ origin: true }));

app.use((req, res, next) => {
  handleError(express.json(), req, res, next);
});

app.get("/api/get-quiz", async (req, res) => {
  await getQuiz(req, res);
});

app.post("/api/save-quiz", async (req, res) => {
  await saveQuiz(req, res);
});

app.post("/api/upload-question", async (req, res) => {
  await uploadQuestion(req, res);
});

/// Returns relevant server stats and logs.
app.get("/api/server-stats", (_, res) => {
  res.sendStatus(400);
});

app.listen(PORT, () => {
  console.log(`🔥 [server]: Server running at https://localhost:${PORT}`);
});
