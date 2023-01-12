import "reflect-metadata";
import "express-async-errors";
import handleError from "./errors/handleErrors";
import express from "express";
import addressRoutes from "./routes/address.routes";
import loginRoutes from "./routes/login.routes";
import { userRoutes } from "./routes/user.routes";
import locationRoutes from "./routes/location.routes";
import schedulesRoutes from "./routes/schedules.routes";
import instructorsRoutes from "./routes/instructors.routes";
import categoriesRoutes from "./routes/categories.routes";

const app = express();

app.use(express.json());

app.use("/address", addressRoutes);
app.use("/login", loginRoutes);
app.use("/user", userRoutes);
app.use("/location", locationRoutes);
app.use("/schedules", schedulesRoutes);
app.use("/instructor", instructorsRoutes);
app.use("/categories", categoriesRoutes);

app.use(handleError);

export default app;
