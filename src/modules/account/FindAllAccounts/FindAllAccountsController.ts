import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindAllAccountsUseCase } from "./FindAllAccountsUseCase";

class FindAllAccountsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const findAllAccountsUseCase = container.resolve(
            FindAllAccountsUseCase
        );

        const response = await findAllAccountsUseCase.execute();

        return res.json(response);
    }
}

export { FindAllAccountsController };
