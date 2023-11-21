import express, { Express, Router } from "express";
import { userRoute } from "./user.route";

const router: Router = express.Router();

const api = process.env.apiVersion || "/api";
router.use(`${api}/users`, userRoute);

export const indexRouter: Router = router;
