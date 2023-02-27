import fs from 'fs';
import multer from 'multer';
import { Router } from 'express';
import IMessagesService from '../services/interfaces/messagesService';
import MessagesService from '../services/impl/messagesService';
import { StatusCodes } from 'http-status-codes';

const messagesRouter: Router = Router();

const messagesService: IMessagesService = new MessagesService();

messagesRouter.post(
    '/',
    async (req, res) => {
            const { message } = req.body;
            if (!message) {
                throw Error('Message not provided.');
            }
            
            await messagesService.uploadMessage(
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
