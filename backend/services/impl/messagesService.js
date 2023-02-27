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
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../../firebase");
// import { FieldValue } from 'firebase-admin/firestore';
const constants_1 = require("../../constants");
class MessagesService {
    uploadMessage(message, creator) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("uploading message");
            firebase_1.db.collection(constants_1.MESSAGES_COLLECTION).add({
                message,
                creator,
                comments: [],
            });
            return message;
        });
    }
    getMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            const messagesRef = yield firebase_1.db.collection(constants_1.MESSAGES_COLLECTION).get();
            const messages = [];
            messagesRef.forEach((message) => {
                console.log(message);
                const messageData = message.data();
                messages.push({
                    creator: messageData.creator,
                    message: messageData.message
                });
            });
            return new Promise((resolve, reject) => {
                resolve(messages);
            });
        });
    }
}
exports.default = MessagesService;
