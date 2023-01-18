import { Router } from "express";
import { createInstructorController } from "../controllers/instructors/createInstructor.controller";
import { deleteInstructorController } from "../controllers/instructors/deleteInstructors.controller";
import { getOneInstructorController } from "../controllers/instructors/getInstructor.controller";
import { auhValidationMiddleware } from "../middlewares/ authValidation.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureVerifyIsAdm.middleware";
import { validateSchemaMiddleware } from "../middlewares/validatedSchemas.middleware";
import { instructorValidationCreated } from "../validations/schemas";
import { getAllInstructorsController } from "../controllers/instructors/getInstructors.controller copy";

const instructorsRoutes = Router();

instructorsRoutes.post(
  "",
  validateSchemaMiddleware(instructorValidationCreated),
  auhValidationMiddleware,
  ensureIsAdmMiddleware,
  createInstructorController
);
instructorsRoutes.get("", getAllInstructorsController);
instructorsRoutes.get(
  "/:id",
  auhValidationMiddleware,
  ensureIsAdmMiddleware,
  getOneInstructorController
);
instructorsRoutes.delete(
  "/:id",
  auhValidationMiddleware,
  ensureIsAdmMiddleware,
  deleteInstructorController
);

export default instructorsRoutes;
