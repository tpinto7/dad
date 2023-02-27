// import IResumeService from '../interfaces/resumeService';
import IMessagesService, { Message } from '../interfaces/messagesService';
import { db } from '../../firebase';
// import { FieldValue } from 'firebase-admin/firestore';

import {
    MESSAGES_COLLECTION,
    PICTURES_COLLECTION
} from '../../constants';


class MessagesService implements IMessagesService {
    async uploadMessage(message: string, creator: string): Promise<string> {
        console.log("uploading message");

        db.collection(MESSAGES_COLLECTION).add({
            message,
            creator,
            comments: [],
        });
        return message;
    }

    async getMessages(): Promise<Message[]> { 
        const messagesRef = await db.collection(MESSAGES_COLLECTION).get();
        const messages : Message[] = []; 

        messagesRef.forEach((message: any) => {
            console.log(message);
            const messageData = message.data();
            messages.push({
                creator: messageData.creator,
                message: messageData.message
            })
        }
        )

        return new Promise((resolve, reject) => {
            resolve(messages);
        });
    }
}

export default MessagesService;
