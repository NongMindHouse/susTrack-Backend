import express, { Express, Router } from "express";
import { userRoute } from "./user.route";
import { projectRoute } from "./project.route";

const router: Router = express.Router();

const api = process.env.apiVersion || "/api";
router.use(`${api}/users`, userRoute);
router.use(`${api}/projects`, projectRoute);

export const indexRouter: Router = router;
