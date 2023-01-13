import { Router } from "express";
import { createInstructorController } from "../controllers/instructors/createInstructor.controller";

const instructorsRoutes = Router();

instructorsRoutes.post("", createInstructorController);

export default instructorsRoutes;
