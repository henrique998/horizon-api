import { inject, injectable } from "tsyringe";

import { AppError } from "../../../errors/AppError";
import { AccountMap } from "../../../mappers/AccountMap";
import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository";

type Account = {
    name: string;
    email: string;
    avatar_url?: string;
};

@injectable()
class ProfileUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository
    ) {}

    async execute(userId: string): Promise<Account> {
        if (!userId) {
            throw new AppError("user id is required!");
        }

        const userExists = await this.accountsRepository.findById(userId);

        if (!userExists) {
            throw new AppError("Account not found!", 404);
        }

        const account = AccountMap.toDTO(userExists);

        return account;
    }
}

export { ProfileUseCase };
