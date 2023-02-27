import fs from 'fs';
import multer from 'multer';
import { Router } from 'express';
import IMessagesService from '../services/interfaces/messagesService';
import MessagesService from '../services/impl/messagesService';
import { StatusCodes } from 'http-status-codes';

const upload = multer({ dest: 'uploads/' });

const messagesRouter: Router = Router();

const messagesService: IMessagesService = new MessagesService();

// resumeRouter.get('/:fileName', validateToken, async (req, res) => {
//     try {
//         const { fileName } = req.params;
//         const url = await resumeService.getResume(fileName);
//         return res.status(StatusCodes.OK).json({ url });
//     } catch (error: unknown) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//     }
// });

messagesRouter.post(
    '/',
    async (req, res) => {
        // try {
        //     console.log(
        //         "hello"
        //     )
        // console.log(req);
            const { message } = req.body;
            if (!message) {
                throw Error('Message not provided.');
            }
            
            const url = await messagesService.uploadMessage(
                message,
                "Anonymous"
            );

            res.status(StatusCodes.CREATED).json({
                msg: 'Message successfully uploaded.',
                message
            });

    }
);

messagesRouter.get(
    '/',
    async (req, res) => { 
        const messages = await messagesService.getMessages();

        res.status(StatusCodes.OK).json({
            messages
        })
    }
)



export default messagesRouter;
