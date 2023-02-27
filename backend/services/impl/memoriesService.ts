// import IResumeService from '../interfaces/resumeService';
import IMemoriesService, { Memory } from '../interfaces/memoriesService';
import { db } from '../../firebase';
// import { FieldValue } from 'firebase-admin/firestore';

import {
    MEMORIES_COLLECTION
} from '../../constants';


class MemoriesService implements IMemoriesService {
    async uploadMemory(memory: Memory): Promise<Memory> {
        console.log("uploading memory");
        const { title, description, creator } = memory; 
        db.collection(MEMORIES_COLLECTION).add({
            title,
            creator,
            description,
            comments: [],
        });
        return memory;
    }

    async getMemories(): Promise<Memory[]> { 
        const memoriesRef = await db.collection(MEMORIES_COLLECTION).get();
        const memories : Memory[] = []; 

        memoriesRef.forEach((memory: any) => {
            console.log(memory);
            const memoriesData = memory.data();
            memories.push({
                creator: memoriesData.creator,
                title: memoriesData.title,
                description: memoriesData.description,
            })
        }
        )

        return new Promise((resolve, reject) => {
            resolve(memories);
        });
    }
}

export default MemoriesService;
