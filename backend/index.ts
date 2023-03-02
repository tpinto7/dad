
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import picturesRouter from './routes/pictures';
import messagesRouter from './routes/messages';
import memoriesRouter from './routes/memories';
import namesRouter from './routes/names';

dotenv.config();

const CORS_ALLOW_LIST = [
    'http://localhost:3000', // Local development
    'http://localhost:3001', // Local development
    'https://celebrating-dad.web.app',
    'https://celebrating-dad-80058.web.app',
    'https://celebrating-dad.firebaseapp.com',
    'https://celebrating-dad-80058.firebaseapp.com',
    'https://celebrationofneil.com',
    'celebrationofneil.com',
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
app.use('/names', namesRouter);


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

// app.post('/pictures', (req: Request, res: Response) => { 
//     res.send("Pictures test");
// })

app.listen({ port: process.env.PORT || 8080 }, () => {
    console.info(`Server is listening on port ${process.env.PORT || 8080}!`);
});
