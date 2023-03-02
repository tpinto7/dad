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
const constants_1 = require("../../constants");
class MemoriesService {
    uploadMemory(memory) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, creator } = memory;
            firebase_1.db.collection(constants_1.MEMORIES_COLLECTION).add({
                title,
                creator,
                description,
                comments: [],
            });
            return memory;
        });
    }
    getMemories() {
        return __awaiter(this, void 0, void 0, function* () {
            const memoriesRef = yield firebase_1.db.collection(constants_1.MEMORIES_COLLECTION).get();
            const memories = [];
            memoriesRef.forEach((memory) => {
                const memoriesData = memory.data();
                memories.push({
                    creator: memoriesData.creator,
                    title: memoriesData.title,
                    description: memoriesData.description,
                });
            });
            return new Promise((resolve, reject) => {
                resolve(memories);
            });
        });
    }
}
exports.default = MemoriesService;
