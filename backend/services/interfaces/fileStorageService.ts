interface IFileStorageService {
    /**
     * Retrieves file
     * @param fileName name of file
     * @param expirationTimeMinutes expiration time in minutes for generated URL
     * @returns Signed URL to file
     * @throws Error if file is not retrieved
     */
    getFile(fileName: string, expirationTimeMinutes?: number): Promise<string>;

    /**
     * Creates file
     * @param filePath: file path as a string,
     * @param contentType MIME type of file
     * @returns String array of size 2 where first element is the file id and second element is the URL
     * @throws Error if name of file already exists
     * @throws Error if file is not uploaded
     */
    createFile(file: string, contentType: string): Promise<string[]>;

    /**
     * Deletes file
     * @param fileName name of file
     * @param filePath path of file
     * @throws Error if name of file does not exist
     * @throws Error if file is not deleted
     */
    deleteFile(fileName: string): Promise<void>;
}

export default IFileStorageService;
