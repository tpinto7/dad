import fs from 'fs';
import multer from 'multer';
import { Router } from 'express';
import IPicturesService from '../services/interfaces/picturesService';
import PicturesService from '../services/impl/picturesService';
import { StatusCodes } from 'http-status-codes';

const upload = multer({ dest: 'uploads/' });

const picturesRouter: Router = Router();

const picturesService: IPicturesService = new PicturesService();

// resumeRouter.get('/:fileName', validateToken, async (req, res) => {
//     try {
//         const { fileName } = req.params;
//         const url = await resumeService.getResume(fileName);
//         return res.status(StatusCodes.OK).json({ url });
//     } catch (error: unknown) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//     }
// });

picturesRouter.post(
    '/',
    upload.single('file'),
    // () => {},
    async (req, res) => {
        // try {
        //     console.log(
        //         "hello"
        //     )
        console.log(req);
            if (!req.file) {
                throw Error('File not provided.');
            }

        //     // if (req.file.size > MAX_FILE_SIZE_IN_BYTES) {
        //     //     throw Error('File size must be less than 5 MB.');
        //     // }
            
            const url = await picturesService.uploadPicture(
                req.file.path,
                req.file.mimetype
            );

            // Multer saves file to disk so we want to delete it there.
            fs.unlink(req.file.path, (err) => {
                if (err) throw err;
            });

            res.status(StatusCodes.CREATED).json({
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
    }
);

picturesRouter.get(
    '/',
    async (req, res) => { 
        const pictures = await picturesService.getPictures();

        res.status(StatusCodes.OK).json({
            pictures
        })
    }
)

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

export default picturesRouter;
