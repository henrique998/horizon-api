import { inject, injectable } from "tsyringe";

import { PhotoDataDTO } from "../../../dtos/photo/PhotoDataDTO";
import { AppError } from "../../../errors/AppError";
import { IStorageProvider } from "../../../providers/storageProvider/IStorageProvider";
import { IPhotosRepository } from "../../../repositories/photos/IPhotosRepository";

interface IRequest {
    accountId: string;
    photoId: string;
}

@injectable()
class DeletePhotoUseCase {
    constructor(
        @inject("PrismaPhotosRepository")
        private photosRepository: IPhotosRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ accountId, photoId }: IRequest): Promise<PhotoDataDTO[]> {
        if (!accountId) {
            throw new AppError("Account id is required!");
        }

        if (!photoId) {
            throw new AppError("Photo id is required!");
        }

        const accountPhotos = await this.photosRepository.findByAccountId(
            accountId
        );

        const photoToDelete = accountPhotos.find(
            (photo) => photo.id === photoId
        );

        if (!photoToDelete) {
            throw new AppError("Photo not found!", 404);
        }

        await this.storageProvider.delete(photoToDelete.url, "photos");

        await this.photosRepository.delete(photoId);

        return accountPhotos;
    }
}

export { DeletePhotoUseCase };
