import { Router } from "express";
import multer from "multer";

import multerConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateAccountController } from "../modules/account/CreateAccount/CreateAccountController";
import { ProfileController } from "../modules/account/Profile/ProfileController";
import { UpdateAvatarController } from "../modules/account/UpdateAvatar/UpdateAvatarController";

const accountRoute = Router();

const createAccountController = new CreateAccountController();
const profileController = new ProfileController();
const updateAvatarController = new UpdateAvatarController();

const uploadAvatar = multer(multerConfig);

accountRoute.post("/", createAccountController.handle);
accountRoute.get("/me", ensureAuthenticated, profileController.handle);
accountRoute.put(
    "/update/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateAvatarController.handle
);

export { accountRoute as accountRoutes };
