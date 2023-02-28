import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import INamesService from '../services/interfaces/namesService';
import NamesService from '../services/impl/namesService';
import { STATUS_CODES } from 'http';

const namesRouter: Router = Router();

const namesService: INamesService = new NamesService();

namesRouter.post(
    '/',
    async (req, res) => {
        try { 
            const { name, value } = req.body;
            if (!name) {
                throw Error('name not provided.');
            }
            
           await namesService.uploadName(
                {
                    name,
                    value: value ?? 16
                }
            );

            res.status(StatusCodes.CREATED).json({
                msg: 'name successfully uploaded.',
                name,
                value: value ?? 16
            });
        } catch (error: unknown) { 
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
        }
    }
);

namesRouter.get(
    '/',
    async (req, res) => { 
        const memories = await namesService.getNames();

        res.status(StatusCodes.OK).json({
            memories
        })
    }
)

export default namesRouter;
