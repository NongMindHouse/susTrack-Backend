import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv"
import cors from "cors";

import { indexRouter } from "@/routes";
const app: Express = express();
const port = process.env.PORT || 8080;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.get("/", (req: Request, res: Response) => {
  res.send("Express TypeScript Server is Running");
});

app.use(indexRouter);

app.listen(port, () => {
  console.log(`✨[server]: Server is running at http://localhost:${port}`);
});
