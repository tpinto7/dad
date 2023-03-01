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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import IResumeService from '../interfaces/resumeService';
const fileStorageService_1 = __importDefault(require("./fileStorageService"));
const firebase_1 = require("../../firebase");
// import { FieldValue } from 'firebase-admin/firestore';
const constants_1 = require("../../constants");
const fileStorageService = new fileStorageService_1.default();
class PicturesService {
    uploadPicture(path, contentType) {
        return __awaiter(this, void 0, void 0, function* () {
            const [pictureFileID, pictureUrl, dimension] = yield fileStorageService.createFile(path, contentType);
            firebase_1.db.collection(constants_1.PICTURES_COLLECTION).add({
                pictureUrl,
                creator: "Anonymous",
                comments: [],
            });
            return pictureUrl;
        });
    }
    getPictures() {
        return __awaiter(this, void 0, void 0, function* () {
            const picturesRef = yield firebase_1.db.collection(constants_1.PICTURES_COLLECTION).get();
            const pictures = [];
            picturesRef.forEach((picture) => {
                const pictureData = picture.data();
                pictures.push({
                    creator: pictureData.creator,
                    pictureUrl: pictureData.pictureUrl,
                });
            });
            return new Promise((resolve, reject) => {
                resolve(pictures);
            });
        });
    }
}
exports.default = PicturesService;
