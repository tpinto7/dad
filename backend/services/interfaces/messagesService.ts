export interface Message {
    message: string; 
    creator: string;
}

// export type Leaderboard = Leader[];

// export interface Leader {
//     displayName: string;
//     resumeUrl: string;
// }

// export type Uid = string;

interface IMessagesService {
    /**
     * Gets a resume pair for users to compare
     * This function will never return your resume.
     * The resumes in the pair will be different
     * @param user The current user
     */
    getMessages(): Promise<Message[]>;

    /**
     * Updates the elo after a match
     * @param winner
     * @param loser
     * @param k the maximum amount of elo a player can win/lose in a match
     */
    uploadMessage(
        message: string,
        creator: string
    ): Promise<string>;

}

export default IMessagesService;
