import { prisma } from "../../../config/prisma";
import { AccountDataDTO } from "../../../dtos/account/AccountDataDTO";
import { ICreateAccountDTO } from "../../../dtos/account/ICreateAccountDTO";
import { IUpdateAvatarDataDTO } from "../../../dtos/account/IUpdateAvatarDataDTO";
import { IAccountsRepository } from "../IAccountsRepository";

class PrismaAccountsRepository implements IAccountsRepository {
    async create({ name, email, password }: ICreateAccountDTO): Promise<void> {
        await prisma.account.create({
            data: {
                name,
                email,
                password,
            },
        });
    }

    async findByEmail(email: string): Promise<AccountDataDTO> {
        const account = await prisma.account.findFirst({
            where: {
                email,
            },
        });

        return account;
    }

    async findById(id: string): Promise<AccountDataDTO> {
        const account = await prisma.account.findFirst({
            where: {
                id,
            },
        });

        return account;
    }

    async updateAvatarById(
        data: IUpdateAvatarDataDTO
    ): Promise<AccountDataDTO> {
        const accountUpdated = await prisma.account.update({
            where: {
                id: data.id,
            },
            data: {
                avatar: data.avatar,
            },
        });

        return accountUpdated;
    }
}

export { PrismaAccountsRepository };
