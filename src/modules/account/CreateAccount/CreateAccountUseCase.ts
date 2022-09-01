import { inject, injectable } from "tsyringe";

import { AppError } from "../../../errors/AppError";
import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateAccountUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository
    ) {}

    async execute({ name, email, password }: IRequest): Promise<void> {
        if (!name) {
            throw new AppError("name is required!");
        }

        if (!email) {
            throw new AppError("email is required!");
        }

        if (!password) {
            throw new AppError("password is required!");
        }

        await this.accountsRepository.create({
            name,
            email,
            password,
        });
    }
}

export { CreateAccountUseCase };
