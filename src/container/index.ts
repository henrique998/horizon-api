import { container } from "tsyringe";

import { LocalStorageProvider } from "../providers/storageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "../providers/storageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "../providers/storageProvider/IStorageProvider";
import { IAccountsRepository } from "../repositories/accounts/IAccountsRepository";
import { PrismaAccountsRepository } from "../repositories/accounts/implementations/PrismaAccountsRepository";
import { PrismaPhotosRepository } from "../repositories/photos/implementations/PrismaPhotosRepository";
import { IPhotosRepository } from "../repositories/photos/IPhotosRepository";

container.registerSingleton<IAccountsRepository>(
    "PrismaAccountsRepository",
    PrismaAccountsRepository
);

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk]
);

container.registerSingleton<IPhotosRepository>(
    "PrismaPhotosRepository",
    PrismaPhotosRepository
);
