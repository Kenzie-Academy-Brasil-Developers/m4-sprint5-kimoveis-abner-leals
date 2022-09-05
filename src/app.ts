import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { sessionRoutes } from "./routers/session.routes";
import { usersRoutes } from "./routers/users.routes";
import { handleErrorMiddleware } from "./middlewares/handleError.middleware";
import { categoriesRoutes } from "./routers/categories.routes";
import { propertiesRoutes } from "./routers/properties.routes";
import { schedulesRoutes } from "./routers/schedules.routes";

const app = express();
app.use(express.json());

app.use("/login", sessionRoutes);
app.use("/users", usersRoutes);
app.use("/categories", categoriesRoutes);
app.use("/properties", propertiesRoutes);
app.use("/schedules", schedulesRoutes);

app.use(handleErrorMiddleware);

export default app;
