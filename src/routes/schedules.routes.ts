import { Router } from "express";
import { listAllSchedulesController, listScheduleByIdController} from "../controllers/schedules/schedules.controllers";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const schedulesRoutes = Router()

schedulesRoutes.get('/:id', ensureAuthMiddleware, listScheduleByIdController)
schedulesRoutes.get('', listAllSchedulesController)

export default schedulesRoutes