import express, { Router } from "express";
const router: Router = express.Router();
import * as userController from "@/controller/user.controller";
import { validateZod } from "@/lib/validateZod";
import { updateUserSchema, userLogin } from "@/lib/schema/userSchema";
import { authJwt } from "@/middleware/auth";

router
  .route("/login")
  .post(userController.Login)

router
  .route("/")
  .get(userController.GetUser)
  .patch(authJwt, validateZod(updateUserSchema), userController.UpdateUser);

router.route("/logout").post(authJwt, userController.Logout);

export const userRoute: Router = router;
