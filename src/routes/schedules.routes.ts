import { Router } from "express";
import { listAllSchedulesInUserController } from "../controllers/schedules/listAllSchedulesInUser.controller";

import {
  createSchedulesController,
  listAllSchedulesController,
  listScheduleByIdController,
} from "../controllers/schedules/schedules.controllers";
import { auhValidationMiddleware } from "../middlewares/ authValidation.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post("", auhValidationMiddleware, createSchedulesController);
schedulesRoutes.get("/instructors/:id", auhValidationMiddleware, listScheduleByIdController);
schedulesRoutes.get("/instructors", listAllSchedulesController);
schedulesRoutes.get("/student/:id", auhValidationMiddleware, listAllSchedulesInUserController)

export default schedulesRoutes;
