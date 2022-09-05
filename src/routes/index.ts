import { Router } from "express";

import { accountRoutes } from "./accounts.routes";
import { photoRoutes } from "./photos.routes";
import { sessionRoutes } from "./session.routes";

const router = Router();

router.use("/accounts", accountRoutes);
router.use("/session", sessionRoutes);
router.use("/photos", photoRoutes);

export { router as routes };
