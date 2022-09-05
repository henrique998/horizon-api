import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAvatarUseCase } from "./UpdateAvatarUseCase";

class UpdateAvatarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.user;
        const avatarFile = req.file.filename;

        const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);

        const result = await updateAvatarUseCase.execute({
            id,
            avatar: avatarFile,
        });

        return res.json(result);
    }
}

export { UpdateAvatarController };
