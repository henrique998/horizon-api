import { inject, injectable } from "tsyringe";

import { PhotoDataDTO } from "../../../dtos/photo/PhotoDataDTO";
import { PhotoMap } from "../../../mappers/PhotoMap";
import { IPhotosRepository } from "../../../repositories/photos/IPhotosRepository";

@injectable()
class GetAllPhotosUseCase {
    constructor(
        @inject("PrismaPhotosRepository")
        private photosRepository: IPhotosRepository
    ) {}

    async execute(): Promise<PhotoDataDTO[]> {
        const photosResponse = await this.photosRepository.getAll();

        const photos = photosResponse
            .map((photo) => PhotoMap.toDTO(photo))
            .sort(() => -1);

        return photos;
    }
}

export { GetAllPhotosUseCase };
