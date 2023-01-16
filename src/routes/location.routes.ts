import { Router } from "express";
import { listLocationByIdDataController } from "../controllers/location/listLocationById,controller";
import { updateLocationController } from "../controllers/location/updateLocation.controller";
import { auhValidationMiddleware } from "../middlewares/ authValidation.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureVerifyIsAdm.middleware";

const locationRoutes = Router();

locationRoutes.get("", auhValidationMiddleware, ensureIsAdmMiddleware, listLocationByIdDataController);
locationRoutes.patch("/:id",auhValidationMiddleware, ensureIsAdmMiddleware, updateLocationController)

export default locationRoutes;
