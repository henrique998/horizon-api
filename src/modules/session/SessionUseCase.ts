import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../errors/AppError";
import { AccountMap } from "../../mappers/AccountMap";
import { IAccountsRepository } from "../../repositories/accounts/IAccountsRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    token: string;
    userData: {
        name: string;
        email: string;
        avatar_url?: string;
    };
}

@injectable()
class SessionUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.accountsRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, process.env.SECRET_KEY, {
            expiresIn: "1d",
            subject: user.id,
        });

        const userData = AccountMap.toDTO(user);

        const authResult: IResponse = {
            token,
            userData,
        };

        return authResult;
    }
}

export { SessionUseCase };
