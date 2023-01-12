import { Router } from "express";
import {
  listAllSchedulesController,
  listScheduleByIdController,
} from "../controllers/schedules/schedules.controllers";
import { auhValidationMiddleware } from "../middlewares/ authValidation.middleware";

const schedulesRoutes = Router();

schedulesRoutes.get(
  "/:id",
  auhValidationMiddleware,
  listScheduleByIdController
);
schedulesRoutes.get("", listAllSchedulesController);

export default schedulesRoutes;
