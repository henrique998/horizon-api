import { AccountDataDTO } from "../dtos/account/AccountDataDTO";

const imageUrls = {
    local: "http://localhost:3333/images",
    s3: process.env.S3_BASE_IMAGE_URL,
};

class AccountMap {
    static toDTO({ id, name, email, avatar }: AccountDataDTO) {
        return {
            id,
            name,
            email,
            avatar_url: avatar
                ? `${imageUrls[process.env.disk]}/avatar/${avatar}`
                : "",
        };
    }
}

export { AccountMap };
