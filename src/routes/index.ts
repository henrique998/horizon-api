import { Router } from "express";

import { accountRoutes } from "./accounts.routes";

const router = Router();

router.use("/accounts", accountRoutes);

export { router as routes };
