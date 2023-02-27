export interface Memory {
    title: string; 
    description: string
    creator: string;
}

interface IMemoriesService {
    getMemories(): Promise<Memory[]>;
    uploadMemory(
        memory: Memory
    ): Promise<Memory>;

}

export default IMemoriesService;
