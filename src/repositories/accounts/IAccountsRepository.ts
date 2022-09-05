import { AccountDataDTO } from "../../dtos/account/AccountDataDTO";
import { ICreateAccountDTO } from "../../dtos/account/ICreateAccountDTO";
import { IUpdateAvatarDataDTO } from "../../dtos/account/IUpdateAvatarDataDTO";

interface IAccountsRepository {
    create(data: ICreateAccountDTO): Promise<void>;
    findByEmail(email: string): Promise<AccountDataDTO>;
    findById(id: string): Promise<AccountDataDTO>;
    updateAvatarById(data: IUpdateAvatarDataDTO): Promise<AccountDataDTO>;
}

export { IAccountsRepository };
