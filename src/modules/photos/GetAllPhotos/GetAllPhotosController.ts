import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAllPhotosUseCase } from "./GetAllPhotosUseCase";

class GetAllPhotosController {
    async handle(req: Request, res: Response): Promise<Response> {
        const getAllPhotosUseCase = container.resolve(GetAllPhotosUseCase);

        const response = await getAllPhotosUseCase.execute();

        return res.json(response);
    }
}

export { GetAllPhotosController };
