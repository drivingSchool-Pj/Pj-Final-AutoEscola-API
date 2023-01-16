import { Router } from "express";
import { createLocationController } from "../controllers/location/createLocation.controller";
import { listLocationaController } from "../controllers/location/listLocation.controller";
import { listLocationByIdDataController } from "../controllers/location/listLocationById.controller";
import { updateLocationController } from "../controllers/location/updateLocation.controller";
import { auhValidationMiddleware } from "../middlewares/ authValidation.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureVerifyIsAdm.middleware";
import { validateSchemaMiddleware } from "../middlewares/validatedSchemas.middleware";
import {
  locationValidationCreate,
  locationValidationPatch,
} from "../validations/schemas";

const locationRoutes = Router();

locationRoutes.get(
  "",
  auhValidationMiddleware,
  ensureIsAdmMiddleware,
  listLocationaController
);

locationRoutes.get(
  "/:id",
  auhValidationMiddleware,
  ensureIsAdmMiddleware,
  listLocationByIdDataController
);

locationRoutes.post(
  "",
  validateSchemaMiddleware(locationValidationCreate),
  auhValidationMiddleware,
  ensureIsAdmMiddleware,
  createLocationController
);

locationRoutes.patch(
  "/:id",
  validateSchemaMiddleware(locationValidationPatch),
  auhValidationMiddleware,
  ensureIsAdmMiddleware,
  updateLocationController
);

export default locationRoutes;
