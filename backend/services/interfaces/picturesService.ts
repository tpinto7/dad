export interface Picture {
    pictureUrl: string; 
    creator: string;
}

interface IPicturesService {
    getPictures(collection: string): Promise<Picture[]>;

    uploadPicture(
        path: string,
        contentType: string,
        collection: string
    ): Promise<string>;
}

export default IPicturesService;
