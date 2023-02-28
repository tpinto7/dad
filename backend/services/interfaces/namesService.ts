export interface Name { 
    name: string;
    value: number;
}

interface INamesService {
    getNames(): Promise<Name[]>;
    uploadName(
       name: Name
    ): Promise<Name | null>;

}

export default INamesService;
