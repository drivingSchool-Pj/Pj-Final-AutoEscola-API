import { Router } from "express";
import { listAllSchedulesInUserController } from "../controllers/schedules/listAllSchedulesInUser.controller";
import {
  createSchedulesController,
  listAllSchedulesController,
  listScheduleByIdController,
} from "../controllers/schedules/schedules.controllers";
import { auhValidationMiddleware } from "../middlewares/ authValidation.middleware";
import { validateSchemaMiddleware } from "../middlewares/validatedSchemas.middleware";
import { schedulesValidationCreated } from "../validations/schemas";

const schedulesRoutes = Router();

schedulesRoutes.post(
  "",
  validateSchemaMiddleware(schedulesValidationCreated),
  auhValidationMiddleware,
  createSchedulesController
);
schedulesRoutes.get(
  "/:id",
  auhValidationMiddleware,
  listScheduleByIdController
);
schedulesRoutes.get("", listAllSchedulesController);
schedulesRoutes.get(
  "/user/:id",
  auhValidationMiddleware,
  listAllSchedulesInUserController
);

export default schedulesRoutes;
