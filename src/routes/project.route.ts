import express, { Router } from "express";
const router: Router = express.Router();
import * as projectController from "@/controller/project.controller";
import { validateZod } from "@/lib/validateZod";
import { authJwt } from "@/middleware/auth";
import { createProjectSchema, getProjectByIdSchema } from "@/lib/schema/projectSchema";

router
  .route("/")
  .get(projectController.GetAll)
  .post(authJwt, validateZod(createProjectSchema), projectController.Create);

router
  .route("/:id")
  .get(validateZod(getProjectByIdSchema), projectController.FindProjectById)
// .patch(authJwt, validateZod(updateProjectSchema), projectController.Update)
// .delete(authJwt, projectController.Delete)

export const projectRoute: Router = router;
