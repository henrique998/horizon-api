import { PhotoDataDTO } from "../dtos/photo/PhotoDataDTO";

const imageUrls = {
    local: "http://localhost:3333/images",
    s3: process.env.S3_BASE_IMAGE_URL,
};

class PhotoMap {
    static toDTO({ id, url }: PhotoDataDTO) {
        return {
            id,
            url: `${imageUrls[process.env.disk]}/photos/${url}`,
        };
    }
}

export { PhotoMap };
