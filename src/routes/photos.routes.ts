import { Router } from "express";
import multer from "multer";

import multerConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreatePhotoController } from "../modules/photos/CreatePhoto/CreatePhotoController";
import { DeletePhotoController } from "../modules/photos/DeletePhoto/DeletePhotoController";
import { GetAllPhotosController } from "../modules/photos/GetAllPhotos/GetAllPhotosController";

const photoRoute = Router();

const getAllPhotosController = new GetAllPhotosController();
const createPhotoController = new CreatePhotoController();
const deletePhotoController = new DeletePhotoController();

const uploadPhoto = multer(multerConfig);

photoRoute.get("/", ensureAuthenticated, getAllPhotosController.handle);

photoRoute.post(
    "/",
    ensureAuthenticated,
    uploadPhoto.single("photo"),
    createPhotoController.handle
);

photoRoute.delete(
    "/delete/:photoId",
    ensureAuthenticated,
    deletePhotoController.handle
);

export { photoRoute as photoRoutes };
