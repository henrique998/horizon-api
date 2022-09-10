import { Request, Response } from "express";
import { container } from "tsyringe";

import { PhotoMap } from "../../../mappers/PhotoMap";
import { DeletePhotoUseCase } from "./DeletePhotoUseCase";

class DeletePhotoController {
    async handle(req: Request, res: Response): Promise<Response> {
        const accountId = req.user.id;
        const { photoId } = req.params;

        const deletePhotoUseCase = container.resolve(DeletePhotoUseCase);

        const response = await deletePhotoUseCase.execute({
            accountId,
            photoId,
        });

        const photos = response.map((photo) => PhotoMap.toDTO(photo));

        return res.status(204).json(photos);
    }
}

export { DeletePhotoController };
