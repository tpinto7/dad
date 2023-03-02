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
const http_status_codes_1 = require("http-status-codes");
const namesService_1 = __importDefault(require("../services/impl/namesService"));
const constants_1 = require("../constants");
const namesRouter = (0, express_1.Router)();
const namesService = new namesService_1.default();
namesRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, value } = req.body;
        if (!name) {
            throw Error('name not provided.');
        }
        yield namesService.uploadName({
            name,
            value: value !== null && value !== void 0 ? value : constants_1.DEFAULT_WORD_SIZE
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            msg: 'name successfully uploaded.',
            name,
            value: value !== null && value !== void 0 ? value : constants_1.DEFAULT_WORD_SIZE
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
namesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const names = yield namesService.getNames();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        names
    });
}));
exports.default = namesRouter;
