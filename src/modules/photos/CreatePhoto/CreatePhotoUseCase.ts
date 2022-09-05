import { inject, injectable } from "tsyringe";

import { AppError } from "../../../errors/AppError";
import { IStorageProvider } from "../../../providers/storageProvider/IStorageProvider";
import { IPhotosRepository } from "../../../repositories/photos/IPhotosRepository";

interface IRequest {
    accountId: string;
    photoUrl: string;
}

@injectable()
class CreatePhotoUseCase {
    constructor(
        @inject("PrismaPhotosRepository")
        private photosRepository: IPhotosRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ accountId, photoUrl }: IRequest) {
        if (!accountId) {
            throw new AppError("Account id is required!");
        }

        if (!photoUrl) {
            throw new AppError("Photo is required!");
        }

        await this.storageProvider.save(photoUrl, "photos");

        await this.photosRepository.create({
            accountId,
            photoUrl,
        });
    }
}

export { CreatePhotoUseCase };
