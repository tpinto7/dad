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
class NamesService {
    uploadName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            firebase_1.db.collection(constants_1.NAMES_COLLECTION).add(name);
            // if we want unique names
            // db.collection(NAMES_COLLECTION).where('name', '==', name.name).get().then(
            //     snapshot => { 
            //         if (!snapshot.empty) { 
            //             return null;
            //         } else { 
            //             db.collection(NAMES_COLLECTION).add(
            //                 name
            //             );
            //         }
            //     }
            // )
            return name;
        });
    }
    getNames() {
        return __awaiter(this, void 0, void 0, function* () {
            const namesRef = yield firebase_1.db.collection(constants_1.NAMES_COLLECTION).get();
            const names = [];
            namesRef.forEach((name) => {
                const nameData = name.data();
                names.push({
                    name: nameData.name,
                    value: nameData.value,
                });
            });
            return new Promise((resolve, reject) => {
                resolve(names);
            });
        });
    }
}
exports.default = NamesService;
