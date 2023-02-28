// Import the functions you need from the SDKs you need
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
// const privateKey = require('./service_account.json');
import privateKey from "./service_account.json";


// Initialize Firebase
const serviceAccount: any = privateKey;

const firebaseApp = initializeApp({
    credential: cert(serviceAccount),
    storageBucket: 'celebrating-dad-80058.appspot.com'
});

const auth = getAuth();
const db = getFirestore();

export { firebaseApp, auth, db };
