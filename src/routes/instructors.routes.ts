import { Router } from "express";
import { createInstructorController } from "../controllers/instructors/createinstructor.controller";

const instructorsRoutes = Router();

instructorsRoutes.post("/instructors", createInstructorController);

export default instructorsRoutes;
