import fs from 'fs';
import multer from 'multer';
import { Router } from 'express';
import IMessagesService from '../services/interfaces/memoriesService';
import MemoriesService from '../services/impl/memoriesService';
import { StatusCodes } from 'http-status-codes';

const memoriesRouter: Router = Router();

const memoriesService: IMessagesService = new MemoriesService();

memoriesRouter.post(
    '/',
    async (req, res) => {
            const { title, description, creator } = req.body;
            if (!title || !description) {
                throw Error('memory not provided.');
            }
            
            await memoriesService.uploadMemory({ title, description, creator: creator ?? "Anonymous"
            });

            res.status(StatusCodes.CREATED).json({
                msg: 'memory successfully uploaded.',
                title,
                description,
                creator: creator ?? "Anonymous"
            });
    }
);

memoriesRouter.get(
    '/',
    async (req, res) => { 
        const memories = await memoriesService.getMemories();

        res.status(StatusCodes.OK).json({
            memories
        })
    }
)

export default memoriesRouter;
