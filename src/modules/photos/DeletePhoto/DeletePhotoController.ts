import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeletePhotoUseCase } from "./DeletePhotoUseCase";

class DeletePhotoController {
    async handle(req: Request, res: Response): Promise<Response> {
        const accountId = req.user.id;
        const { photoId } = req.params;

        const deletePhotoUseCase = container.resolve(DeletePhotoUseCase);

        await deletePhotoUseCase.execute({
            accountId,
            photoId,
        });

        return res.status(204).send();
    }
}

export { DeletePhotoController };
