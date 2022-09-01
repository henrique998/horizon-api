import { AccountDataDTO } from "../../dtos/account/AccountDataDTO";
import { ICreateAccountDTO } from "../../dtos/account/ICreateAccountDTO";

interface IAccountsRepository {
    create(data: ICreateAccountDTO): Promise<void>;
    findAll(): Promise<AccountDataDTO[]>;
}

export { IAccountsRepository };
