"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("firebase-admin/storage");
const firebase_1 = require("../../firebase");
const uuidv4_1 = require("uuidv4");
class FileStorageService {
    getFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storage = (0, storage_1.getStorage)(firebase_1.firebaseApp);
                const url = yield storage.bucket().file(fileName).publicUrl();
                return url;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createFile(filePath, contentType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storage = (0, storage_1.getStorage)(firebase_1.firebaseApp);
                const fileUuid = (0, uuidv4_1.uuid)();
                const metadata = {
                    metadata: {
                        firebaseStorageDownloadTokens: fileUuid
                    },
                    contentType
                };
                const uploadResponse = yield storage.bucket().upload(filePath, {
                    metadata
                });
                return [uploadResponse[0].name, uploadResponse[0].publicUrl()];
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storage = (0, storage_1.getStorage)(firebase_1.firebaseApp);
                yield storage.bucket().file(fileName).delete();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = FileStorageService;
