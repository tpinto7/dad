import { db } from '../../firebase';

import {
    NAMES_COLLECTION
} from '../../constants';
import INamesService, { Name } from '../interfaces/namesService';


class NamesService implements INamesService {
    async uploadName(name: Name): Promise<Name | null> {
        db.collection(NAMES_COLLECTION).add(
            name
        );
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
    }

    async getNames(): Promise<Name[]> { 
        const namesRef = await db.collection(NAMES_COLLECTION).get();
        const names : Name[] = []; 

        namesRef.forEach((name: any) => {
            const nameData = name.data();
            names.push({
                name: nameData.name,
                value: nameData.value,
            })
        }
        )

        return new Promise((resolve, reject) => {
            resolve(names);
        });
    }
}

export default NamesService;
