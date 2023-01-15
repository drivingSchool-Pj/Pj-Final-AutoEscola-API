import { Router } from "express";
import { listLocationByIdDataController } from "../controllers/location/listLocationById,controller";
import ensureIsAdmMiddleware from "../middlewares/ensureVerifyIsAdm.middleware";

const locationRoutes = Router();

locationRoutes.get("", ensureIsAdmMiddleware, listLocationByIdDataController);
export default locationRoutes;
