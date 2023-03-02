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
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const picturesService_1 = __importDefault(require("../services/impl/picturesService"));
const http_status_codes_1 = require("http-status-codes");
const constants_1 = require("../constants");
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const picturesRouter = (0, express_1.Router)();
const picturesService = new picturesService_1.default();
const uploadHandler = (req, res, isPhoto) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        throw Error('File not provided.');
    }
    let url;
    if (isPhoto) {
        url = yield picturesService.uploadPicture(req.file.path, req.file.mimetype, constants_1.PICTURES_COLLECTION);
    }
    else {
        url = yield picturesService.uploadPicture(req.file.path, req.file.mimetype, constants_1.VIDEOS_COLLECTION);
    }
    // Multer saves file to disk so we want to delete it there.
    fs_1.default.unlink(req.file.path, (err) => {
        if (err)
            throw err;
    });
    const msg = isPhoto ? 'Photo successfully uploaded' : 'Video successfully uploaded';
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        msg,
        url
    });
});
picturesRouter.post('/', upload.single('file'), 
// () => {},
(req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield uploadHandler(req, res, true); }));
picturesRouter.post('/videos', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield uploadHandler(req, res, false); }));
picturesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pictures = yield picturesService.getPictures(constants_1.PICTURES_COLLECTION);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        pictures
    });
}));
picturesRouter.get('/videos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videos = yield picturesService.getPictures(constants_1.VIDEOS_COLLECTION);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        videos
    });
}));
exports.default = picturesRouter;
