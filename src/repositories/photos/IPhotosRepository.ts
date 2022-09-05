import { ICreatePhotoDTO } from "../../dtos/photo/ICreatePhotoDTO";
import { PhotoDataDTO } from "../../dtos/photo/PhotoDataDTO";

interface IPhotosRepository {
    getAll(): Promise<PhotoDataDTO[]>;
    create(data: ICreatePhotoDTO): Promise<void>;
    delete(photoId: string): Promise<void>;
    findByAccountId(accountId: string): Promise<PhotoDataDTO[] | null>;
}

export { IPhotosRepository };
