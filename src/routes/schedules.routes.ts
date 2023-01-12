import { Router } from "express";

import {
  createSchedulesController,
  listAllSchedulesController,
  listScheduleByIdController,
} from "../controllers/schedules/schedules.controllers";
import { auhValidationMiddleware } from "../middlewares/ authValidation.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post("", auhValidationMiddleware, createSchedulesController);

schedulesRoutes.get(
  "/instructors/:id",
  auhValidationMiddleware,
  listScheduleByIdController
);
schedulesRoutes.get("/instructors", listAllSchedulesController);

export default schedulesRoutes;
