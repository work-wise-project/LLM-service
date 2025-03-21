import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getConfig } from "./config/config";
import { errorHandler } from "./middlewares";
import { example } from "./router";

dotenv.config();

const app = express();
const { port } = getConfig();

// Middlewares
app.use(cors());
app.use(express.json());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// Routes
app.use("/example", example);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
