import { getStorage } from 'firebase-admin/storage';
import { firebaseApp } from '../../firebase';
import IFileStorageService from '../interfaces/fileStorageService';
import { uuid } from 'uuidv4';

class FileStorageService implements IFileStorageService {
    async getFile(fileName: string): Promise<string> {
        try {
            const storage = getStorage(firebaseApp);
            const url = await storage.bucket().file(fileName).publicUrl();
            return url;
        } catch (error: unknown) {
            throw error;
        }
    }

    async createFile(filePath: string, contentType: string): Promise<string[]> {
        try {
            const storage = getStorage(firebaseApp);
            const fileUuid = uuid();

            const metadata = {
                metadata: {
                    firebaseStorageDownloadTokens: fileUuid
                },
                contentType
            };

            const uploadResponse = await storage.bucket().upload(filePath, {
                metadata
            });
            return [uploadResponse[0].name, uploadResponse[0].publicUrl()];
        } catch (error: unknown) {
            throw error;
        }
    }

    async deleteFile(fileName: string): Promise<void> {
        try {
            const storage = getStorage(firebaseApp);

            await storage.bucket().file(fileName).delete();
        } catch (error: unknown) {
            throw error;
        }
    }
}

export default FileStorageService;
