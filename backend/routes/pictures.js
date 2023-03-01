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
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const picturesRouter = (0, express_1.Router)();
const picturesService = new picturesService_1.default();
// resumeRouter.get('/:fileName', validateToken, async (req, res) => {
//     try {
//         const { fileName } = req.params;
//         const url = await resumeService.getResume(fileName);
//         return res.status(StatusCodes.OK).json({ url });
//     } catch (error: unknown) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//     }
// });
picturesRouter.post('/', upload.single('file'), 
// () => {},
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //     console.log(
    //         "hello"
    //     )
    if (!req.file) {
        throw Error('File not provided.');
    }
    //     // if (req.file.size > MAX_FILE_SIZE_IN_BYTES) {
    //     //     throw Error('File size must be less than 5 MB.');
    //     // }
    const url = yield picturesService.uploadPicture(req.file.path, req.file.mimetype);
    // Multer saves file to disk so we want to delete it there.
    fs_1.default.unlink(req.file.path, (err) => {
        if (err)
            throw err;
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        msg: 'File successfully uploaded.',
        url
    });
    // } catch (error: unknown) {
    //     if (req.file?.path) {
    //         fs.unlink(req.file.path, () => {
    //             // nothing
    //         });
    //     }
    //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    // }
}));
picturesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pictures = yield picturesService.getPictures();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        pictures
    });
}));
// resumeRouter.delete('/:fileName', validateToken, async (req, res) => {
//     try {
//         const { fileName } = req.params;
//         const decodedToken = (req as any).decodedToken;
//         const uid = decodedToken['uid'];
//         await resumeService.deleteResume(uid, fileName);
//         return res.status(StatusCodes.OK).json({
//             msg: 'Resume successfully deleted.'
//         });
//     } catch (error: unknown) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//     }
// });
exports.default = picturesRouter;
