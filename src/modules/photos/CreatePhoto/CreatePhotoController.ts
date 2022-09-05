import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePhotoUseCase } from "./CreatePhotoUseCase";

class CreatePhotoController {
    async handle(req: Request, res: Response): Promise<Response> {
        const accountId = req.user.id;
        const photoUrl = req.file.filename;

        const createPhotoUseCase = container.resolve(CreatePhotoUseCase);

        await createPhotoUseCase.execute({
            accountId,
            photoUrl,
        });

        return res.json({ message: "Photo created successfuly!" });
    }
}

export { CreatePhotoController };
