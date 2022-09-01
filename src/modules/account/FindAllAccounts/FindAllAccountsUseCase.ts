import { inject, injectable } from "tsyringe";

import { AccountDataDTO } from "../../../dtos/account/AccountDataDTO";
import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository";

@injectable()
class FindAllAccountsUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository
    ) {}

    async execute(): Promise<AccountDataDTO[]> {
        const accounts = await this.accountsRepository.findAll();

        return accounts;
    }
}

export { FindAllAccountsUseCase };
