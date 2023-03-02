import fs from 'fs';
import multer from 'multer';
import { Router } from 'express';
import IPicturesService from '../services/interfaces/picturesService';
import PicturesService from '../services/impl/picturesService';
import { StatusCodes } from 'http-status-codes';
import { PICTURES_COLLECTION, VIDEOS_COLLECTION } from '../constants';

const upload = multer({ dest: 'uploads/' });

const picturesRouter: Router = Router();

const picturesService: IPicturesService = new PicturesService();

const uploadHandler = async (req: any, res: any, isPhoto: boolean) => { 
    if (!req.file) {
        throw Error('File not provided.');
    }

    let url;
    if (isPhoto) { 
        url = await picturesService.uploadPicture(
            req.file.path,
            req.file.mimetype,
            PICTURES_COLLECTION
        );
    } else { 
        url = await  picturesService.uploadPicture(
            req.file.path,
            req.file.mimetype,
            VIDEOS_COLLECTION
        );
    }

    // Multer saves file to disk so we want to delete it there.
    fs.unlink(req.file.path, (err) => {
        if (err) throw err;
    });

    const msg = isPhoto ? 'Photo successfully uploaded' : 'Video successfully uploaded';
    res.status(StatusCodes.CREATED).json({
        msg,
        url
    });
}


picturesRouter.post(
    '/',
    upload.single('file'),
    // () => {},
    async (req, res) => await uploadHandler(req, res, true)
);

picturesRouter.post(
    '/videos',
    upload.single('file'),
    async (req, res) => await uploadHandler(req, res, false)
);



picturesRouter.get(
    '/',
    async (req, res) => { 
        const pictures = await picturesService.getPictures(PICTURES_COLLECTION);
        res.status(StatusCodes.OK).json({
            pictures
        })
    }
)

picturesRouter.get(
    '/videos',
    async (req, res) => { 
        const videos = await picturesService.getPictures(VIDEOS_COLLECTION);
        res.status(StatusCodes.OK).json({
            videos
        })
    }
)

export default picturesRouter;
