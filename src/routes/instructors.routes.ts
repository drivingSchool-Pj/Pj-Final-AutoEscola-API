import { Router } from "express";
import { createInstructorController } from "../controllers/instructors/createInstructor.controller";
import { getAllInstructorsController } from "../controllers/instructors/getInstructors.controller";
import { auhValidationMiddleware } from "../middlewares/ authValidation.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureVerifyIsAdm.middleware";

const instructorsRoutes = Router();

instructorsRoutes.post(
  "",
  auhValidationMiddleware,
  ensureIsAdmMiddleware,
  createInstructorController
);
instructorsRoutes.get("", getAllInstructorsController);

export default instructorsRoutes;
