import express, { Express, Router } from "express";
const router: Router = express.Router();
import * as userController from "@/controller/user.controller";
import { validateZod } from "@/lib/validateZod";
import { userLogin } from "@/lib/schema/userSchema";

router
  .route("/")
  .get(userController.test)

// router
//   .route("/login")
//   .post(validateZod(userLogin), userController.test)

export const userRoute: Router = router;
