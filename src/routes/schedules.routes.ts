import { Router } from "express";
import { createSchedulesController } from "../controllers/schedules/createSchedules.controller";
import { listAllSchedulesController } from "../controllers/schedules/listAllSchedules.controller";
import { listAllSchedulesInUserController } from "../controllers/schedules/listAllSchedulesInUser.controller";
import { listScheduleByIdController } from "../controllers/schedules/listScheduleByIdController";
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
