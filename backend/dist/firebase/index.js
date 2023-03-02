"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = exports.firebaseApp = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const firestore_1 = require("firebase-admin/firestore");
// const privateKey = require('./service_account.json');
const service_account_json_1 = __importDefault(require("./service_account.json"));
// Initialize Firebase
const serviceAccount = service_account_json_1.default;
const firebaseApp = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)(serviceAccount),
    storageBucket: 'celebrating-dad-80058.appspot.com'
});
exports.firebaseApp = firebaseApp;
const auth = (0, auth_1.getAuth)();
exports.auth = auth;
const db = (0, firestore_1.getFirestore)();
exports.db = db;
