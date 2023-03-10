"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const pictures_1 = __importDefault(require("./routes/pictures"));
const messages_1 = __importDefault(require("./routes/messages"));
const memories_1 = __importDefault(require("./routes/memories"));
const names_1 = __importDefault(require("./routes/names"));
dotenv_1.default.config();
const CORS_ALLOW_LIST = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://celebrating-dad.web.app',
    'https://celebrating-dad-80058.web.app',
    'https://celebrating-dad.firebaseapp.com',
    'https://celebrating-dad-80058.firebaseapp.com',
    'https://celebrationofneil.com',
    'celebrationofneil.com',
];
const CORS_OPTIONS = {
    origin: CORS_ALLOW_LIST,
    credentials: true
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(CORS_OPTIONS));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/pictures', pictures_1.default);
app.use('/messages', messages_1.default);
app.use('/memories', memories_1.default);
app.use('/names', names_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
// app.post('/pictures', (req: Request, res: Response) => { 
//     res.send("Pictures test");
// })
app.listen({ port: process.env.PORT || 8080 }, () => {
    console.info(`Server is listening on port ${process.env.PORT || 8080}!`);
});
