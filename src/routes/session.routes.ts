import { Router } from "express";

import { SessionController } from "../modules/session/SessionController";

const sessionRoute = Router();

const sessionController = new SessionController();

sessionRoute.post("/", sessionController.handle);

export { sessionRoute as sessionRoutes };
