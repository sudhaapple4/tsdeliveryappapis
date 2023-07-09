declare module Express {
    export interface Request {
        bucketUrl: string;
        fileName: string;
    }
}