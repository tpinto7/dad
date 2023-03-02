import IMessagesService, { Message } from '../interfaces/messagesService';
import { db } from '../../firebase';

import {
    MESSAGES_COLLECTION,
} from '../../constants';

class MessagesService implements IMessagesService {
    async uploadMessage(message: string, creator: string): Promise<string> {
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
