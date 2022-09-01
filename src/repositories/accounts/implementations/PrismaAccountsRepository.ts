import { AccountDataDTO } from "../../../dtos/account/AccountDataDTO";
import { ICreateAccountDTO } from "../../../dtos/account/ICreateAccountDTO";
import { IAccountsRepository } from "../IAccountsRepository";

class PrismaAccountsRepository implements IAccountsRepository {
    private accounts: AccountDataDTO[] = [];

    async create(data: ICreateAccountDTO): Promise<void> {
        const account = {
            ...data,
        };

        this.accounts.push(account);
    }

    async findAll(): Promise<AccountDataDTO[]> {
        return this.accounts;
    }
}

export { PrismaAccountsRepository };
