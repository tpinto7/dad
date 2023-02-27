
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { request } from 'http';
import { ReturnStatement } from 'typescript';
import picturesRouter from './routes/pictures';
import IMessagesService from './services/interfaces/messagesService';
import MessagesService from './services/impl/messagesService';
import messagesRouter from './routes/messages';
import memoriesRouter from './routes/memories';
// const messagesService: IMessagesService = new MessagesService();

dotenv.config();

const CORS_ALLOW_LIST = [
    'http://localhost:3000', // Local development
    'http://localhost:3001', // Local development
    'https://replace.me' // TODO: replace
];

const CORS_OPTIONS: cors.CorsOptions = {
    origin: CORS_ALLOW_LIST,
    credentials: true
};

const app: Express = express();
app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/pictures', picturesRouter);
app.use('/messages', messagesRouter);
app.use('/memories', memoriesRouter);


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

// app.post('/pictures', (req: Request, res: Response) => { 
//     res.send("Pictures test");
// })

app.listen({ port: process.env.PORT || 5000 }, () => {
    console.info(`Server is listening on port ${process.env.PORT || 5000}!`);
});
