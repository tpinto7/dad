import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import INamesService from '../services/interfaces/namesService';
import NamesService from '../services/impl/namesService';
import { DEFAULT_WORD_SIZE } from '../constants';

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
                    value: value ?? DEFAULT_WORD_SIZE
                }
            );

            res.status(StatusCodes.CREATED).json({
                msg: 'name successfully uploaded.',
                name,
                value: value ?? DEFAULT_WORD_SIZE
            });
        } catch (error: unknown) { 
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
        }
    }
);

namesRouter.get(
    '/',
    async (req, res) => { 
        const names = await namesService.getNames();

        res.status(StatusCodes.OK).json({
            names
        })
    }
)

export default namesRouter;
