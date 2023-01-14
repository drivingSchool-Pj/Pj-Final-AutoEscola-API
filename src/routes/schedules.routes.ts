import { Router } from "express";
import { listAllSchedulesInIstructorController } from "../controllers/schedules/listAllSchedulesInIstructor.controller";
import { listAllSchedulesInUserController } from "../controllers/schedules/listAllSchedulesInUser.controller";

import {
  createSchedulesController,
  listAllSchedulesController,
  listScheduleByIdController,
} from "../controllers/schedules/schedules.controllers";
import { auhValidationMiddleware } from "../middlewares/ authValidation.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post("", auhValidationMiddleware, createSchedulesController);
schedulesRoutes.get("/:id", auhValidationMiddleware, listScheduleByIdController);
schedulesRoutes.get("", listAllSchedulesController);
schedulesRoutes.get("/student/:id", auhValidationMiddleware, listAllSchedulesInUserController)
schedulesRoutes.get("/instructors/:id", auhValidationMiddleware, listAllSchedulesInIstructorController)

export default schedulesRoutes;
