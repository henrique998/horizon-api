import { inject, injectable } from "tsyringe";

import { AccountDataDTO } from "../../../dtos/account/AccountDataDTO";
import { AppError } from "../../../errors/AppError";
import { IStorageProvider } from "../../../providers/storageProvider/IStorageProvider";
import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository";

interface IRequest {
    id: string;
    avatar: string;
}

@injectable()
class UpdateAvatarUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ id, avatar }: IRequest): Promise<AccountDataDTO> {
        if (!id) {
            throw new AppError("Id is required!");
        }

        if (!avatar) {
            throw new AppError("Avatar is required!");
        }

        const accountExists = await this.accountsRepository.findById(id);

        if (!accountExists) {
            throw new AppError("Account does not exists!");
        }

        if (accountExists.avatar) {
            await this.storageProvider.delete(accountExists.avatar, "avatar");
        }

        await this.storageProvider.save(avatar, "avatar");

        const updatedAccount = await this.accountsRepository.updateAvatarById({
            id,
            avatar,
        });

        return updatedAccount;
    }
}

export { UpdateAvatarUseCase };
