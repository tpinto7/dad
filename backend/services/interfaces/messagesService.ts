export interface Message {
    message: string; 
    creator: string;
}

interface IMessagesService {
    getMessages(): Promise<Message[]>;

    uploadMessage(
        message: string,
        creator: string
    ): Promise<string>;
}

export default IMessagesService;
