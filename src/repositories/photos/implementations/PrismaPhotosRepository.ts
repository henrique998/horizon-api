import { prisma } from "../../../config/prisma";
import { ICreatePhotoDTO } from "../../../dtos/photo/ICreatePhotoDTO";
import { PhotoDataDTO } from "../../../dtos/photo/PhotoDataDTO";
import { IPhotosRepository } from "../IPhotosRepository";

class PrismaPhotosRepository implements IPhotosRepository {
    async getAll(): Promise<PhotoDataDTO[]> {
        const photos = await prisma.photo.findMany();

        return photos;
    }

    async create({ accountId, photoUrl }: ICreatePhotoDTO): Promise<void> {
        await prisma.photo.create({
            data: {
                url: photoUrl,
                accountId,
            },
        });
    }

    async findByAccountId(accountId: string): Promise<PhotoDataDTO[] | null> {
        const photos = await prisma.photo.findMany({
            where: {
                accountId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return photos;
    }

    async delete(photoId: string): Promise<void> {
        await prisma.photo.delete({
            where: {
                id: photoId,
            },
        });
    }
}

export { PrismaPhotosRepository };
