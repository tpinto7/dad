"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messagesService_1 = __importDefault(require("../services/impl/messagesService"));
const http_status_codes_1 = require("http-status-codes");
const constants_1 = require("../constants");
const messagesRouter = (0, express_1.Router)();
const messagesService = new messagesService_1.default();
messagesRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, creator } = req.body;
    if (!message) {
        throw Error('Message not provided.');
    }
    yield messagesService.uploadMessage(message, creator !== null && creator !== void 0 ? creator : constants_1.ANONYMOUS);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        msg: 'Message successfully uploaded.',
        message
    });
}));
messagesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield messagesService.getMessages();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        messages
    });
}));
exports.default = messagesRouter;
