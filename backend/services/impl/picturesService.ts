// import IResumeService from '../interfaces/resumeService';
import FileStorageService from './fileStorageService';
import IFileStorageService from '../interfaces/fileStorageService';
import IPicturesService, { Picture } from '../interfaces/picturesService';
import { db } from '../../firebase';
// import { FieldValue } from 'firebase-admin/firestore';

import {
    PICTURES_COLLECTION
} from '../../constants';

const fileStorageService: IFileStorageService = new FileStorageService();

class PicturesService implements IPicturesService {
    async uploadPicture(path: string, contentType: string): Promise<string> {
        console.log("uploading picture");
        console.log(path);
        const [pictureFileID, pictureUrl, dimension] =
        await fileStorageService.createFile(path, contentType);

        db.collection(PICTURES_COLLECTION).add({
            pictureUrl,
            creator: "Anonymous",
            comments: [],
        });
        return pictureUrl;
    }

    async getPictures(): Promise<Picture[]> { 
        const picturesRef = await db.collection(PICTURES_COLLECTION).get();
        const pictures : Picture[] = []; 

        picturesRef.forEach((picture: any) => {
            const pictureData = picture.data();
            pictures.push({
                creator: pictureData.creator,
                pictureUrl: pictureData.pictureUrl,

            })
        }
        )

        return new Promise((resolve, reject) => {
            resolve(pictures);
        });
    }


    

    // async getResume(uid: string): Promise<string> {
    //     try {
    //         if (!uid) {
    //             throw Error('Uid must be passed.');
    //         }
    //         const userRef = db.collection(USERS_COLLECTION).doc(uid);
    //         const user = await userRef.get();

    //         if (!user.exists) {
    //             throw Error('User does not exist');
    //         }

    //         return user.data()?.resumeUrl;
    //     } catch (error: unknown) {
    //         throw error;
    //     }
    // }

}

export default PicturesService;
